(function () {
  if (window.intellijobPanelsReady) return;
  window.intellijobPanelsReady = true;

  var panelIds = ['accountPanel', 'topupPanel', 'appsPanel'];

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    var el = byId(id);
    if (el) el.textContent = value;
  }

  function setClass(id, className) {
    var el = byId(id);
    if (el) el.className = className;
  }

  function setHtml(id, value) {
    var el = byId(id);
    if (el) el.innerHTML = value;
  }

  function showAlert(id, msg, type) {
    var el = byId(id);
    if (!el) return;
    el.innerHTML = '<div class="sun-alert sun-alert-' + type + '">' + msg + '</div>';
    setTimeout(function () {
      el.innerHTML = '';
    }, 4000);
  }

  function markActiveTrigger(panelId) {
    document.querySelectorAll('[data-sun-panel]').forEach(function (trigger) {
      trigger.classList.toggle('sun-panel-trigger-active', trigger.getAttribute('data-sun-panel') === panelId);
    });
  }

  function openPanel(panelId) {
    panelIds.forEach(function (id) {
      var panel = byId(id);
      if (panel) panel.style.display = 'none';
    });

    var target = byId(panelId);
    var overlay = byId('sunOverlay');
    var shell = byId('sunPanel');
    if (!target || !overlay) return;

    target.style.display = 'block';
    overlay.style.display = 'flex';
    overlay.classList.add('active');
    if (shell) {
      shell.style.background = '#1a1a2e';
      shell.style.padding = '28px';
      shell.style.pointerEvents = 'auto';
    }
    markActiveTrigger(panelId);

    if (panelId === 'accountPanel' && typeof window.loadAccountData === 'function') window.loadAccountData();
    if (panelId === 'appsPanel' && typeof window.loadAppsData === 'function') window.loadAppsData();
  }

  function closePanel() {
    var overlay = byId('sunOverlay');
    var shell = byId('sunPanel');
    if (overlay) overlay.classList.remove('active');
    if (shell) {
      shell.style.background = 'transparent';
      shell.style.padding = '0';
      shell.style.pointerEvents = 'none';
    }
    markActiveTrigger('');
    if (panelIds.indexOf(window.location.hash.slice(1)) !== -1 && window.history && window.history.replaceState) {
      window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function updatePanelHash(panelId) {
    var nextHash = '#' + panelId;
    if (window.location.hash === nextHash) return;

    if (window.history && window.history.pushState) {
      window.history.pushState(null, document.title, window.location.pathname + window.location.search + nextHash);
    } else {
      window.location.hash = panelId;
    }
  }

  async function loadAccountData() {
    try {
      var subRes = await fetch('/api/get-subscription-details');
      var statusRes = await fetch('/api/get-user-status');
      var sub = await subRes.json();
      var status = await statusRes.json();
      var plan = (sub.subscriptionData && sub.subscriptionData.subscriptionPlan) || 'None';
      var expiry = (sub.subscriptionData && sub.subscriptionData.subscriptionExpires) || 'N/A';
      var subStatus = (sub.subscriptionData && sub.subscriptionData.subscriptionStatus) || 'Expired';
      var apps = status.successfulApplications || 0;
      var autoMode = status.autoMode || false;
      var limit = plan === 'Premium' ? 24 : 20;
      var pct = Math.min(Math.round((apps / limit) * 100), 100);

      setText('sPlan', plan);
      setText('sStatus', subStatus);
      setClass('sStatus', 'sun-stat-value ' + (subStatus === 'Active' ? 'green' : 'red'));
      setText('sExpiry', expiry);
      setText('sApps', apps);
      setText('sMode', autoMode ? 'Auto' : 'Consent');
      setClass('sMode', 'sun-stat-value ' + (autoMode ? 'yellow' : 'green'));

      var toggle = byId('autoModeToggle');
      if (toggle) toggle.checked = autoMode;
      var consent = byId('consentStatus');
      if (consent) {
        consent.textContent = autoMode ? 'Inactive' : 'Active';
        consent.style.color = autoMode ? '#a0a0b0' : '#10b981';
      }

      setHtml('sdPlan', '<span class="sun-badge sun-badge-purple">' + plan + '</span>');
      setHtml('sdStatus', '<span class="sun-badge ' + (subStatus === 'Active' ? 'sun-badge-green' : 'sun-badge-red') + '">' + subStatus + '</span>');
      setText('sdExpiry', expiry);
      setText('sdApps', apps);
      setHtml('sdHelper', '<span class="sun-badge ' + (status.interviewHelper ? 'sun-badge-green' : 'sun-badge-red') + '">' + (status.interviewHelper ? 'Unlocked' : 'Locked') + '</span>');

      document.querySelectorAll('#accountPlanLabel').forEach(function (el) { el.textContent = plan; });
      document.querySelectorAll('#accountStatusLabel').forEach(function (el) { el.textContent = subStatus === 'Active' ? 'Expires: ' + expiry : 'Expired'; });
      document.querySelectorAll('#accountProgress').forEach(function (el) { el.style.width = pct + '%'; });
    } catch (e) {
      console.error('loadAccountData:', e);
    }
  }

  async function loadAppsData() {
    try {
      var res = await fetch('/api/get-user-apps');
      var data = await res.json();
      setText('apTotalSent', data.total || 0);
      setText('apToday', data.today || 0);
      setText('apWeek', data.week || 0);
      document.querySelectorAll('#appsTotalLabel').forEach(function (el) { el.textContent = data.total || 0; });
      document.querySelectorAll('#appsTodayLabel').forEach(function (el) { el.textContent = 'Today: ' + (data.today || 0); });
      document.querySelectorAll('#appsProgress').forEach(function (el) {
        el.style.width = Math.min(((data.total || 0) / 20) * 100, 100) + '%';
      });

      var tbody = byId('recentAppsBody');
      if (tbody) {
        if (data.recent && data.recent.length > 0) {
          tbody.innerHTML = data.recent.map(function (a) {
            return '<tr><td>' + (a.role || a.title || '-') + '</td><td style="font-size:11px">' +
              (a.processedAt ? new Date(a.processedAt).toLocaleString() : '-') +
              '</td><td><span class="sun-badge sun-badge-green">Sent</span></td></tr>';
          }).join('');
        } else {
          tbody.innerHTML = '<tr><td colspan="3" style="color:#a0a0b0;text-align:center;padding:20px">No applications yet</td></tr>';
        }
      }

      var autoLogCard = byId('autoLogCard');
      var autoLogBody = byId('autoLogBody');
      if (autoLogCard && autoLogBody && data.autoLogs && data.autoLogs.length > 0) {
        autoLogCard.style.display = 'block';
        autoLogBody.innerHTML = data.autoLogs.map(function (a) {
          return '<tr><td>' + (a.role || '-') + '</td><td>' + (a.company || '-') +
            '</td><td style="font-size:11px">' + (a.appliedAt ? new Date(a.appliedAt).toLocaleString() : '-') + '</td></tr>';
        }).join('');
      }
    } catch (e) {
      console.error('loadAppsData:', e);
    }
  }

  async function toggleAutoMode(checkbox) {
    var mode = checkbox.checked;
    try {
      var res = await fetch('/user/toggle-automode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoMode: mode })
      });
      var data = await res.json();
      if (data.success) {
        setText('sMode', mode ? 'Auto' : 'Consent');
        setClass('sMode', 'sun-stat-value ' + (mode ? 'yellow' : 'green'));
        var consent = byId('consentStatus');
        if (consent) {
          consent.textContent = mode ? 'Inactive' : 'Active';
          consent.style.color = mode ? '#a0a0b0' : '#10b981';
        }
        showAlert('accountAlert', 'Mode updated to ' + (mode ? 'Auto' : 'Consent'), 'success');
      } else {
        checkbox.checked = !mode;
        showAlert('accountAlert', 'Failed to update mode', 'error');
      }
    } catch (e) {
      checkbox.checked = !mode;
      showAlert('accountAlert', 'Network error', 'error');
    }
  }

  async function initiatePayment(plan, gateway) {
    gateway = gateway || 'paystack';
    showAlert('topupAlert', 'Initiating payment...', 'success');
    try {
      var endpoint = gateway === 'monnify' ? '/api/initiate-monnify-payment' : '/api/initiate-payment';
      var res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan })
      });
      var data = await res.json();
      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        showAlert('topupAlert', data.message || 'Could not initiate payment', 'error');
      }
    } catch (e) {
      showAlert('topupAlert', 'Network error', 'error');
    }
  }

  function bindPanelEvents() {
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-sun-panel]');
      if (trigger) {
        event.preventDefault();
        var panelId = trigger.getAttribute('data-sun-panel');
        openPanel(panelId);
        updatePanelHash(panelId);
        return;
      }

      if (event.target.closest('[data-sun-close]')) {
        event.preventDefault();
        closePanel();
        return;
      }

      var paymentButton = event.target.closest('[data-payment-plan]');
      if (paymentButton) {
        event.preventDefault();
        initiatePayment(paymentButton.getAttribute('data-payment-plan'), paymentButton.getAttribute('data-payment-gateway') || 'paystack');
        return;
      }

      if (event.target === byId('sunOverlay')) closePanel();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closePanel();
      if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-sun-panel]')) {
        event.preventDefault();
        openPanel(event.target.getAttribute('data-sun-panel'));
      }
    });

    var toggle = byId('autoModeToggle');
    if (toggle) toggle.addEventListener('change', function () { toggleAutoMode(toggle); });

    window.addEventListener('hashchange', openPanelFromHash);
    openPanelFromHash();
  }

  function openPanelFromHash() {
    var panelId = window.location.hash ? window.location.hash.slice(1) : '';
    if (panelIds.indexOf(panelId) !== -1) openPanel(panelId);
  }

  window.openPanel = openPanel;
  window.closePanel = closePanel;
  window.handleOverlayClick = function (event) {
    if (event.target === byId('sunOverlay')) closePanel();
  };
  window.loadAccountData = loadAccountData;
  window.loadAppsData = loadAppsData;
  window.toggleAutoMode = toggleAutoMode;
  window.initiatePayment = initiatePayment;
  window.showAlert = showAlert;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindPanelEvents);
  } else {
    bindPanelEvents();
  }
})();
