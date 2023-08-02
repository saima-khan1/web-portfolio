let projectCount;
let messageCount;
let visitorCount;

const fetchDashboardData = async () => {
  await fetch('/api/projects')
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data.length);
      projectCount = data.length;
    });

  await fetch('/api/messages')
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data.length);
      messageCount = data.length;
    });

  await fetch('/total_visitor_count')
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data.totalCount);
      visitorCount = data.totalCount;
    });

  const dashbordContent = document.getElementById('dashbord');
  const dashboardCards = document.createElement('div');
  dashboardCards.classList.add('dashbord-cards');
  dashboardCards.innerHTML = `
    <div class="cards">
    <div class="card-heading">
    <p class="text">No of views</p>
    <i class="fas fa-eye"> </i>
    </div>
      <p class="value">${visitorCount}</p>
    </div>
    <div class="cards">
    <div class="card-heading">
    <p class="text">No of Projects</p>
    <i class="fas fa-folder"></i>
    </div>
      
      <p class="value">${projectCount}</p>
    </div>
    <div class="cards">
    <div class="card-heading">
    <p class="text">No of Messages</p>
    
    <i class="fas fa-envelope"></i>
    </div>
      
      
      <p class="value">${messageCount}</p>
    </div>
  `;

  dashbordContent.appendChild(dashboardCards);
};
fetchDashboardData();
