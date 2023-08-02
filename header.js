// const header = document.getElementById("header");
// const container = document.createElement("div");
// container.classList.add('container');
// container.innerHTML= `
// <nav>
//                 <img src="./images/logo.png" alt="profile-image">
//                 <ul id="sidemenu">
//                     <li><a href="#home">Home</a></li>
//                     <li><a href="#about">About</a></li>
//                     <li><a href="#projects">Work</a></li>
//                     <li><a href="#contact">Contact</a></li>
//                     <li><a href="admin/login.html">Admin</a></li>
//                     <i class="fa fa-times" onclick="closemenu()"></i>
//                 </ul>
//                     <i class="fa fa-bars" onclick="openmenu()"></i>
//             </nav>
//           `

// header.appendChild(container);
// const sideMenu = document.getElementById("sidemenu");
// const openmenu = ()=>{
//     sideMenu.style.visibility='visible';
// }
// const closemenu = ()=>{
//     sideMenu.style.visibility='hidden';
// }

const header = document.getElementById('header');
const container = document.createElement('div');
container.classList.add('container');
container.innerHTML = `
<nav>
    <img src="./images/logo.png" alt="profile-image">
    <ul id="sidemenu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="admin/login.html">Admin</a></li>
        <i class="fa fa-times" id="closeMenuIcon"></i>
    </ul>
    <i class="fa fa-bars" id="openMenuIcon"></i>
</nav>
`;

header.appendChild(container);

// Get references to the menu icons
const openMenuIcon = document.getElementById('openMenuIcon');
const closeMenuIcon = document.getElementById('closeMenuIcon');
const sideMenu = document.getElementById('sidemenu');

// Add click event listeners to handle the open and close menu actions
openMenuIcon.addEventListener('click', () => {
  sideMenu.style.visibility = 'visible';
});

closeMenuIcon.addEventListener('click', () => {
  sideMenu.style.visibility = 'hidden';
});

const navLink = document.querySelectorAll('nav ul li a');
navLink.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href === 'admin/login.html') {
      // Handle Admin link separately
      window.location.href = href; // Redirect to the admin page
    } else {
      const section = document.querySelector(href);
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Function to reset visibility of navigation menu on resize
const resetMenuVisibility = () => {
  if (window.innerWidth >= 768) {
    sideMenu.style.visibility = 'visible';
  } else {
    sideMenu.style.visibility = 'hidden';
  }
};

// Listen for resize event and call the resetMenuVisibility function
window.addEventListener('resize', resetMenuVisibility);

// Call the resetMenuVisibility function initially to set the initial visibility state
resetMenuVisibility();

//function to keep header sticky
window.onscroll = function () {
  myFunction();
};
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

document
  .getElementById('adminLink')
  .addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Toggle the visibility of the login form
    var loginContainer = document.getElementById('loginContainer');
    loginContainer.style.display =
      loginContainer.style.display === 'none' ? 'block' : 'none';
  });

document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the entered username and password
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Perform validation
    if (username === 'admin' && password === 'password') {
      // Login successful, show the admin section
      document.getElementById('admin').style.display = 'block';
    } else {
      // Login failed, display an error message
      alert('Invalid username or password. Please try again.');
    }
  });
