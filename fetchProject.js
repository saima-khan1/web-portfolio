const fetchProject = async () => {
  await fetch('/api/projects')
    .then((response) => response.json())
    .then((data) => {
      data.map((details) => {
        console.log(details.tag);
        const projectContent = document.getElementById('details');
        const projectData = document.createElement('div');
        projectData.classList.add('project-data');
        const row1 = document.createElement('div');
        row1.classList.add('row-1');
        const row2 = document.createElement('div');
        row2.classList.add('row-2');
        row1.innerHTML = `
        <div class="project-tag"><h3>${details.tag}</h3></div>`;
        row2.innerHTML = `
        <ol>
                    <li><b>${details.title}</b></li>
                    <li>${details.description}</li>
                    <li><a href="${details.link}" target="_blank" >Know more</a></li>
        </ol>`;
        projectData.appendChild(row1);
        projectData.appendChild(row2);
        projectContent.appendChild(projectData);
      });
    })
    .catch((error) => {
      console.log('Error fetching about content:', error);
    });
};

fetchProject();
