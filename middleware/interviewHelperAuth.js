// middleware/interviewHelperAuth.js
// Protects /api/transcribe and /api/coach routes
// Access is granted if the user:
//   (a) has an active Intellijob subscription, OR
//   (b) was placed in a job through Intellijob (jobPlacedThroughUs: true), OR
//   (c) has an active standalone interviewHelper subscription

const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI ||
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}${process.env.MONGO_OPTIONS}`;

async function requireInterviewHelperAccess(req, res, next) {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({
      error:   'Not authenticated',
      code:    'UNAUTHENTICATED',
    });
  }

  const mongoClient = new MongoClient(uri);
  try {
    await mongoClient.connect();
    const db   = mongoClient.db('olukayode_sage');
    const user = await db.collection('Users_CV_biodata').findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
    }

    // Check 1: Active Intellijob subscription
    const sub = user.subscription;
    if (sub?.plan && sub?.expirationDate) {
      const expiry = new Date(sub.expirationDate);
      if (expiry > new Date()) {
        req.interviewHelperUser = { userId, source: 'intellijob_subscription' };
        return next();
      }
    }

    // Check 2: Placed through Intellijob (permanent)
    if (user.jobPlacedThroughUs === true) {
      req.interviewHelperUser = { userId, source: 'job_placement' };
      return next();
    }

    // Check 3: Standalone interview helper subscription
    const ih = user.interviewHelper;
    if (ih?.access === true && ih?.source === 'standalone_subscription') {
      const ihExpiry = new Date(ih.expirationDate);
      if (ihExpiry > new Date()) {
        req.interviewHelperUser = { userId, source: 'standalone_subscription' };
        return next();
      }
    }

    // No valid access found
    return res.status(403).json({
      error: 'Interview Helper access required',
      code:  'INTERVIEW_HELPER_LOCKED',
      message: 'Subscribe to Intellijob or purchase Interview Helper access to use this feature.',
    });

  } catch (err) {
    console.error('[InterviewHelper] Auth check failed:', err.message);
    return res.status(500).json({ error: 'Auth check failed' });
  } finally {
    await mongoClient.close();
  }
}

module.exports = { requireInterviewHelperAccess };
