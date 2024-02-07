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
   loadComponent("assets/header.html", "header-placeholder");
   loadComponent("assets/sidebar.html", "sidebar-placeholder");
   loadComponent("assets/hero.html", "hero-placeholder");
   loadComponent("assets/form.html", "form-section-placeholder");
   loadComponent("assets/result.html", "result-section-placeholder");
   loadComponent("assets/footer.html", "footer-placeholder");
   loadComponent("assets/modal.html", "modal-placeholder");
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
