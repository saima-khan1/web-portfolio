const addProject = document.getElementById('addProjectForm');
const projectTitleInput = document.getElementById('projectTitleInput');
const projectDescInput = document.getElementById('projectDescInput');
const projectLinkInput = document.getElementById('projectLinkInput');
const projectTagInput = document.getElementById('projectTagInput');

addProject.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = projectTitleInput.value;
  const description = projectDescInput.value;
  const link = projectLinkInput.value;
  const tag = projectTagInput.value;
  fetch('/api/add/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, link, tag }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response
      console.log(data);
      addProject.reset();
    })
    .catch((error) => {
      console.log('Error adding projects:', error);
    });
});
