// Get the login form element
const loginForm = document.getElementById('login-form');
// Add an event listener to the login form submit event
loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission
  // Get the entered username and password
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // Perform your login validation here
  // You can check the entered username and password against your credentials
  if (username === 'admin' && password === 'password') {
    // Redirect to the admin page
    window.location.href = '/admin/admin-page.html';
  } else {
    alert('Invalid username or password. Please try again.');
  }
});
