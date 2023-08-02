// Remove Project
const removeProjectForm = document.getElementById('removeProjectForm');
const projectTitle = document.getElementById('removeTitleInput');

removeProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('title', projectTitle);
  const title = projectTitle.value;

  // Send delete request to the server
  fetch('/api/delete/project', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response
      console.log(data);
    })
    .catch((error) => {
      console.log('Error removing project from DB', error);
    });
});
