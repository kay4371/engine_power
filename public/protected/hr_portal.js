document.getElementById('addDriverForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const passenger = document.getElementById('passenger').value;
    const carPlateNumber = document.getElementById('carPlateNumber').value;
    const time = document.getElementById('time').value;
  
    const response = await fetch('/add_driver', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, passenger, carPlateNumber, time }),
    });
  
    if (response.ok) {
      alert('Driver added successfully');
      document.getElementById('addDriverForm').reset();
    } else {
      const errorData = await response.json();
      alert('Error adding driver: ' + errorData.message);
    }
  });
  





