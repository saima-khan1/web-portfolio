document.addEventListener('DOMContentLoaded', function () {
  const options = document.getElementById('options');
  options.innerHTML = `
        <li class="tab-links active-link" data-section="dashbord">Dashboard</li>
        <li class="tab-links" data-section="addProject">Add Project</li>
        <li class="tab-links" data-section="removeProject">Remove Project</li>
        <li class="tab-links" data-section="updateAboutMe">Update About Me</li>
        <li class="tab-links" data-section="messages">Messages</li>`;

  // Add event listeners to tab links
  options.querySelectorAll('.tab-links').forEach(function (tabLink) {
    tabLink.addEventListener('click', function () {
      // Get the section ID from the data-section attribute
      const sectionId = tabLink.getAttribute('data-section');

      // Call the toggleSection function with the sectionId
      toggleSection(sectionId);
    });
  });

  // Initially toggle the 'dashbord' section as active
  toggleSection('dashbord');
});

//DOM manipulation for Add projects form
const addProjectForm = document.getElementById('addProjectForm');
addProjectForm.innerHTML = `<P>Add New Project</p>
<input type="text" id="projectTitleInput" placeholder="Title">
<input type="text" id="projectDescInput" placeholder="Description">
<input type="text" id="projectLinkInput" placeholder="link">
<input type="text" id="projectTagInput" placeholder="tag">
<button type="submit" id="addProjectBtn">Add</button>`;

//DOM manipulation for Remove project form
const removeProject = document.getElementById('removeProjectForm');
removeProject.innerHTML = `
<P>Fill the project name to which you want to remove</p>
<input type="text" id="removeTitleInput" placeholder="Title">
<button type="submit" id="removeProjectBtn">Remove</button>`;

//DOM mnupulation for update About Me
const updateAboutMe = document.getElementById('updateAboutForm');
updateAboutMe.innerHTML = `<P>Add content to update About Me section</P>
    <textarea id="aboutContentInput" placeholder="About Me"></textarea>
    <button type="submit" id="updateAboutBtn">Update</button>`;
