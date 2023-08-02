const fetchAbout = async () => {
  await fetch('/api/about')
    .then((response) => response.json())
    .then((data) => {
      const aboutContent = document.getElementById('about');
      const aboutDiv = document.createElement('div');
      aboutDiv.classList.add('card_about');
      aboutDiv.innerHTML = `
          <div class="about-col1"><img src="./images/saima1-removebg.png" alt="about-image"></div>
          <div class="about-col2">
            <h1 class="sub-title">About me</h1>
            <p class="about-content">${data.content}</p>
            <div class="tab-titles">
              <div id="skillsTab" class="tab-links active-link">Skills</div>
              <div id="experienceTab" class="tab-links">Experience</div>
              <div id="educationTab" class="tab-links">Education</div>
            </div>
            <div id="sectionContent"></div>
          </div>
        `;
      aboutContent.appendChild(aboutDiv);

      // Attach event handlers to the tabs
      const skillsTab = document.getElementById('skillsTab');
      skillsTab.addEventListener('click', () =>
        showSection('skills', JSON.parse(data.skills))
      );

      const experienceTab = document.getElementById('experienceTab');
      experienceTab.addEventListener('click', () =>
        showSection('experience', data.experience)
      );

      const educationTab = document.getElementById('educationTab');
      educationTab.addEventListener('click', () =>
        showSection('education', JSON.parse(data.education))
      );
      showSection('skills', JSON.parse(data.skills));
    })
    .catch((error) => {
      console.log('Error fetching about content:', error);
    });
};

function showSection(section, sectionData) {
  const sectionContent = document.getElementById('sectionContent');
  sectionContent.innerHTML = 'skills'; // Clear previous section content

  switch (section) {
    case 'skills':
      activateTab('skillsTab');
      if (Array.isArray(sectionData)) {
        sectionContent.innerHTML = `<ol>${createListItems(sectionData)}</ol>`;
      }
      break;
    case 'experience':
      activateTab('experienceTab');
      sectionContent.innerHTML = `<p>${sectionData}</p>`;
      break;
    case 'education':
      activateTab('educationTab');
      if (Array.isArray(sectionData)) {
        console.log(sectionData[0]);
        sectionContent.innerHTML = `<li><b>College: </b>${sectionData[0]}</li>
          <li><b>School: </b>${sectionData[1]}</li>
          <li><b>Course: </b>${sectionData[2]}</li>`;
      }
      break;
  }
}
function activateTab(tabId) {
  const tabLinks = document.getElementsByClassName('tab-links');
  for (let i = 0; i < tabLinks.length; i++) {
    if (tabLinks[i].id === tabId) {
      tabLinks[i].classList.add('active-link');
    } else {
      tabLinks[i].classList.remove('active-link');
    }
  }
}
function createListItems(data) {
  const items = data.map((item) => `<li>${item}</li>`);
  return items.join('');
}

fetchAbout();
