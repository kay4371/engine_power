// Helper function to create HTML elements
function createElement(tagName, attributes, children) {
    const element = document.createElement(tagName);
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    if (Array.isArray(children)) {
      children.forEach((child) => {
        element.appendChild(child);
      });
    }
    return element;
  }
  
  // Helper function to format date and time
  function formatDateTime(dateString) {
    const options = { dateStyle: 'medium', timeStyle: 'short' };
    const dateTime = new Date(dateString);
    return dateTime.toLocaleString(undefined, options);
  }
  
  // Function to render visitors' information
  async function renderVisitors() {
    const response = await fetch('/get_visitors');
    if (response.ok) {
      const { visitors } = await response.json();
      const visitorsContainer = document.getElementById('visitorsContainer');
  
      // Clear previous content
      visitorsContainer.innerHTML = '';
  
      // Render each visitor
      visitors.forEach((visitor) => {
        const { _id, name, address, purpose, hasAppointment, admitted } = visitor;
  
        const visitorElement = createElement('div', { class: 'visitor' }, [
          createElement('p', {}, [createElement('strong', {}, ['Name:']), ` ${name}`]),
          createElement('p', {}, [createElement('strong', {}, ['Address:']), ` ${address}`]),
          createElement('p', {}, [createElement('strong', {}, ['Purpose:']), ` ${purpose}`]),
          createElement('p', {}, [createElement('strong', {}, ['Has Appointment:']), ` ${hasAppointment}`]),
          createElement('p', {}, [createElement('strong', {}, ['Admitted:']), ` ${admitted}`]),
        ]);
  
        if (!admitted) {
          const admitButton = createElement('button', { class: 'admitButton' }, ['Admit']);
          admitButton.addEventListener('click', async () => {
            const admitResponse = await fetch(`/admit_visitor/${_id}`, { method: 'PUT' });
            if (admitResponse.ok) {
              alert('Visitor admitted successfully');
              renderVisitors();
            } else {
              const errorData = await admitResponse.json();
              alert('Error admitting visitor: ' + errorData.message);
            }
          });
          visitorElement.appendChild(admitButton);
        }
  
        visitorsContainer.appendChild(visitorElement);
      });
    } else {
      alert('Error retrieving visitors');
    }
  }
  
  // Connect to WebSocket for real-time updates
  const socket = io();
  socket.on('connect', () => {
    console.log('Socket connected');
  });
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
  socket.on('visitor_admitted', () => {
    renderVisitors();
  });
  
  // Initial render
  renderVisitors();
  