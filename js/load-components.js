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
   loadComponent("hero.html", "hero-placeholder");
   loadComponent("form.html", "form-section-placeholder");
   loadComponent("result.html", "result-section-placeholder");
   loadComponent("footer.html", "footer-placeholder");
   loadComponent("modal.html", "modal-placeholder");
   console.log("Components loaded");

   // Additional code to trigger data fetching and initial results display
   fetchData().then(data => {
       populateDropdownOptions(data, 'government', 'governorateFilter');
       populateDropdownOptions(data, 'specialty', 'specialtyFilter');
       populateDropdownOptions(data, 'type', 'typeFilter');

       // Initial data load
       filterResults();
   });
});
