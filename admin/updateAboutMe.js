// Update about content
const updateAboutForm = document.getElementById('updateAboutForm');
const aboutContentInput = document.getElementById('aboutContentInput');

updateAboutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const content = aboutContentInput.value;

  // Send update request to the server
  fetch('/api/update/about', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response
      console.log(data);
      updateAboutForm.reset();
    })
    .catch((error) => {
      console.log('Error updating about content:', error);
    });
});
