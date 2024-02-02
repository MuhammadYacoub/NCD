// load-components.js

document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and insert component content
    function loadComponent(component, placeholderId) {
       fetch(component)
          .then(response => response.text())
          .then(content => {
             document.getElementById(placeholderId).innerHTML = content;
          });
    }
 
    // Load Components
    loadComponent("header.html", "header-placeholder");
    loadComponent("sidebar.html", "sidebar-placeholder");
    loadComponent("form.html", "form-section-placeholder");
    loadComponent("result.html", "result-section-placeholder");
    loadComponent("footer.html", "footer-placeholder");
 });
 