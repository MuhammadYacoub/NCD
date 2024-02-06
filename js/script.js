// sidebar
    function showSidebar(){
        const sidebar = document.querySelector(".sidebar");
        sidebar.style.display ='flex';
    }
    function hideSidebar(){
        const sidebar = document.querySelector(".sidebar");
        sidebar.style.display ='none';
    }



// search
    // Function to fetch JSON data
    async function fetchData() {
        const response = await fetch('data/coun.json');
        const data = await response.json();
        return data;
    }

    // Function to filter and display results
    async function filterResults() {
        const healthcareData = await fetchData();

        // Get selected values from filters
        const selectedGovernorate = document.getElementById('governorateFilter').value;
        const selectedSpecialty = document.getElementById('specialtyFilter').value;
        const selectedType = document.getElementById('typeFilter').value;
        const globalSearchQuery = document.getElementById('globalSearch').value.toLowerCase();

        // Disable specialty filter if the selected type is "المستشفيات"
        const specialtyFilter = document.getElementById('specialtyFilter');
        specialtyFilter.disabled = selectedType === 'المستشفيات';

        // Filter the data based on selections and global search query
        const filteredData = healthcareData.filter(item => {
            return (
                (selectedGovernorate === 'All' || item.government === selectedGovernorate) &&
                (selectedSpecialty === 'All' || item.specialty === selectedSpecialty) &&
                (selectedType === 'All' || item.type === selectedType) &&
                (item.name.toLowerCase().includes(globalSearchQuery) ||
                    item.government.toLowerCase().includes(globalSearchQuery) ||
                    item.specialty.toLowerCase().includes(globalSearchQuery) ||
                    item.type.toLowerCase().includes(globalSearchQuery))
            );
        });

           // Display filtered results
           displayResults(filteredData);
    }


    // Function to display results
    function displayResults(data) {
        const resultsContainer = document.getElementById('results');

        // Clear previous results
        resultsContainer.innerHTML = '';

        if (data.length === 0) {
            // Display a message when there are no results
    const noResultsMessage = document.createElement('div');
    noResultsMessage.innerHTML = `
    
        <div class="alert alert-danger" role="alert">
            عذرا | لا يوجد نتائج   !
        </div>
    
    `;
            resultsContainer.appendChild(noResultsMessage);
        } else {
            // Loop through filtered data and create result elements
            data.forEach(item => {
            const resultElement = document.createElement('div');
                resultElement.classList.add('col-md-3');
                // Customize the content based on your JSON structure
                resultElement.innerHTML = `
                <div class="card m-3 b-2">
                        <div class = "card-header">
                        <h5>${item.name}</h5>
                        </div>
                        <div class="card-body">
                        <p"> التخصص :${item.specialty}</p>
                            <!-- <p class="card-text fs-6">${item.type}</p> --> 
                            <p">${item.government}</p>
                        </div>
                        
                        <div class=" card-footer d-flex justify-content-center">
                            <button class="btn btn-outline-primary" role="button"  m-3" id="searchButton" onclick="searchOnGoogleMaps('${item.name}')">بحث عن الموقع</button>
                        </div>
                </div>

                   <!-- <p>${item.name}, ${item.government}, ${item.specialty}, ${item.type}
                    </p> --> `;
                resultsContainer.appendChild(resultElement);
            });
        }
    }

    // Function to populate dropdown options
    function populateDropdownOptions(data, property, dropdownId) {
        const dropdown = document.getElementById(dropdownId);

        // Get unique values for the specified property
        const uniqueValues = [...new Set(data.map(item => item[property]))];

        // Add "All" option by default
        dropdown.innerHTML = '<option value="All">الجميع</option>';

        // Add other options
        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            dropdown.appendChild(option);
        });
    }

    // Add event listeners to your filter elements
    // Call filterResults() when filters change
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to your filter elements
    // Call filterResults() when filters change
    document.getElementById('governorateFilter').addEventListener('change', filterResults);
    document.getElementById('specialtyFilter').addEventListener('change', filterResults);
    document.getElementById('typeFilter').addEventListener('change', filterResults);

    // Initial data load and populate dropdown options
    fetchData().then(data => {
        populateDropdownOptions(data, 'government', 'governorateFilter');
        populateDropdownOptions(data, 'specialty', 'specialtyFilter');
        populateDropdownOptions(data, 'type', 'typeFilter');

        // Initial data load
        filterResults();
    });
});


     // Initial data load and populate dropdown options
     fetchData().then(data => {
        populateDropdownOptions(data, 'government', 'governorateFilter');
        populateDropdownOptions(data, 'specialty', 'specialtyFilter');
        populateDropdownOptions(data, 'type', 'typeFilter');

        // Initial data load
        filterResults();
    });



  // Search on Google Maps
      function searchOnGoogleMaps(query) {
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
    }

   