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
                resultElement.classList.add('col-sm-3');
                // Customize the content based on your JSON structure
                resultElement.innerHTML = `
                <div class="card m-3 ">
                    <div class = "card-header text-success fw-bold">
                        <h5 class="card-title fw-bold text-center fw-bold">${item.name}</h5>
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



      function searchOnGoogleMaps(query) {
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
    }


    // Function to handle downloading the document
    function downloadForm() {
      // Get the selected service category from the dropdown
      var selectedService = document.getElementById('serviceCategory').value;
      
      // Construct the path to the document based on the selected category
      var documentPath = '/forms/' + selectedService + '.jpg';
  
      // Create a temporary anchor element to trigger the download
      var downloadLink = document.createElement('a');
      downloadLink.href = documentPath;
      downloadLink.download = 'document.jpg';
      downloadLink.click();
    }
  
  // Function to handle form submission
  function sendEmail() {
    // Gather form data
    var name = document.getElementById('name').value;
    var degree = document.getElementById('degree').value;
    var branch = document.getElementById('branch').value;
    var department = document.getElementById('department').value;
    var mobile = document.getElementById('mobile').value;
    var email = document.getElementById('email').value;
    var file = document.getElementById('fileInput').files[0];

    // Simple validation (you can enhance this as needed)
    if (name === '' || degree === '' || branch === '' || department === '' || mobile === '' || email === '' || !file) {
      alert('يرجى ملء جميع الحقول وتحميل الملف');
      return;
    }

    // Log the form data to the console (for testing purposes)
    console.log('Form Data:');
    console.log('Name:', name);
    console.log('Degree:', degree);
    console.log('Branch:', branch);
    console.log('Department:', department);
    console.log('Mobile:', mobile);
    console.log('Email:', email);
    console.log('File:', file); // This will log the File object, you may need to handle file uploads differently

    // Now you can proceed with further actions like sending the form data via email or submitting it to a server
    // Since we're not handling server-side processing yet, we'll stop here
  }













    //   jotform
  var ifr = document.getElementById("JotFormIFrame-240377567464062");
  if (ifr) {
    var src = ifr.src;
    var iframeParams = [];
    if (window.location.href && window.location.href.indexOf("?") > -1) {
      iframeParams = iframeParams.concat(window.location.href.substr(window.location.href.indexOf("?") + 1).split('&'));
    }
    if (src && src.indexOf("?") > -1) {
      iframeParams = iframeParams.concat(src.substr(src.indexOf("?") + 1).split("&"));
      src = src.substr(0, src.indexOf("?"))
    }
    iframeParams.push("isIframeEmbed=1");
    ifr.src = src + "?" + iframeParams.join('&');
  }
  window.handleIFrameMessage = function(e) {
    if (typeof e.data === 'object') { return; }
    var args = e.data.split(":");
    if (args.length > 2) { iframe = document.getElementById("JotFormIFrame-" + args[(args.length - 1)]); } else { iframe = document.getElementById("JotFormIFrame"); }
    if (!iframe) { return; }
    switch (args[0]) {
      case "scrollIntoView":
        iframe.scrollIntoView();
        break;
      case "setHeight":
        iframe.style.height = args[1] + "px";
        if (!isNaN(args[1]) && parseInt(iframe.style.minHeight) > parseInt(args[1])) {
          iframe.style.minHeight = args[1] + "px";
        }
        break;
      case "collapseErrorPage":
        if (iframe.clientHeight > window.innerHeight) {
          iframe.style.height = window.innerHeight + "px";
        }
        break;
      case "reloadPage":
        window.location.reload();
        break;
      case "loadScript":
        if( !window.isPermitted(e.origin, ['jotform.com', 'jotform.pro']) ) { break; }
        var src = args[1];
        if (args.length > 3) {
            src = args[1] + ':' + args[2];
        }
        var script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        document.body.appendChild(script);
        break;
      case "exitFullscreen":
        if      (window.document.exitFullscreen)        window.document.exitFullscreen();
        else if (window.document.mozCancelFullScreen)   window.document.mozCancelFullScreen();
        else if (window.document.mozCancelFullscreen)   window.document.mozCancelFullScreen();
        else if (window.document.webkitExitFullscreen)  window.document.webkitExitFullscreen();
        else if (window.document.msExitFullscreen)      window.document.msExitFullscreen();
        break;
    }
    var isJotForm = (e.origin.indexOf("jotform") > -1) ? true : false;
    if(isJotForm && "contentWindow" in iframe && "postMessage" in iframe.contentWindow) {
      var urls = {"docurl":encodeURIComponent(document.URL),"referrer":encodeURIComponent(document.referrer)};
      iframe.contentWindow.postMessage(JSON.stringify({"type":"urls","value":urls}), "*");
    }
  };
  window.isPermitted = function(originUrl, whitelisted_domains) {
    var url = document.createElement('a');
    url.href = originUrl;
    var hostname = url.hostname;
    var result = false;
    if( typeof hostname !== 'undefined' ) {
      whitelisted_domains.forEach(function(element) {
          if( hostname.slice((-1 * element.length - 1)) === '.'.concat(element) ||  hostname === element ) {
              result = true;
          }
      });
      return result;
    }
  };
  if (window.addEventListener) {
    window.addEventListener("message", handleIFrameMessage, false);
  } else if (window.attachEvent) {
    window.attachEvent("onmessage", handleIFrameMessage);
  }
