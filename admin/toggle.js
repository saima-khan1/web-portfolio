// function toggleSection(sectionId) {
//     var sections = document.getElementsByClassName("option-section");
//     for (var i = 0; i < sections.length; i++) {
//         if (sections[i].id === sectionId) {
//             sections[i].style.display = "block";
//         } else {
//             sections[i].style.display = "none";
//         }
//     }

//     var tabLinks = document.getElementsByClassName("tab-links");
//     for (var i = 0; i < tabLinks.length; i++) {
//         if (tabLinks[i].getAttribute("onclick").includes(sectionId)) {
//             tabLinks[i].classList.add("active-link");
//         } else {
//             tabLinks[i].classList.remove("active-link");
//         }
//     }
// }

function toggleSection(sectionId) {
  var sections = document.getElementsByClassName('option-section');
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].id === sectionId) {
      sections[i].style.display = 'block';
    } else {
      sections[i].style.display = 'none';
    }
  }

  var tabLinks = document.getElementsByClassName('tab-links');
  for (var i = 0; i < tabLinks.length; i++) {
    if (tabLinks[i].getAttribute('data-section') === sectionId) {
      tabLinks[i].classList.add('active-link');
    } else {
      tabLinks[i].classList.remove('active-link');
    }
  }
}
