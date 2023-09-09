

let dropdownData; // Store the fetched data globally

async function fetchData() {
  const response = await fetch('http://localhost/newmaster/api/dropdown.php');
  dropdownData = await response.json();
}

// Function to populate the Location dropdown
function populateLocationDropdown() {
  const locationSelect = document.getElementById('search_location_main');
  locationSelect.innerHTML = '<option value="">Select Location</option>';

  for (const locationId in dropdownData) {
    const option = document.createElement('option');
    option.value = locationId;
    option.textContent = dropdownData[locationId].location_name;
    locationSelect.appendChild(option);
  }

  // Refresh the selectpicker after modifying the options
  $(locationSelect).selectpicker('refresh');
}

// Function to populate the Developer dropdown based on the selected Location
function populateDeveloperDropdown() {
  const locationSelect = document.getElementById('search_location_main');
  const developerSelect = document.getElementById('search_developer_main');
  const projectSelect = document.getElementById('search_project_main');

  const selectedLocationId = locationSelect.value;
  developerSelect.innerHTML = '<option value="">Select Developer</option>';
  projectSelect.innerHTML = '<option value="">Select Project</option>';

  if (selectedLocationId) {
    const developers = dropdownData[selectedLocationId].developers;
    for (const developerId in developers) {
      const option = document.createElement('option');
      option.value = developerId;
      option.textContent = developers[developerId].developer_name;
      developerSelect.appendChild(option);
    }

    // Refresh the selectpicker after modifying the options
    $(developerSelect).selectpicker('refresh');
  }

  // After populating the Developer dropdown, also populate the Project dropdown
  populateProjectDropdown();
}

// Function to populate the Project dropdown based on the selected Developer
function populateProjectDropdown() {
  const locationSelect = document.getElementById('search_location_main');
  const developerSelect = document.getElementById('search_developer_main');
  const projectSelect = document.getElementById('search_project_main');

  const selectedLocationId = locationSelect.value;
  const selectedDeveloperId = developerSelect.value;
  projectSelect.innerHTML = '<option value="">Select Project</option>';

  if (selectedLocationId && selectedDeveloperId) {
    const projects = dropdownData[selectedLocationId].developers[selectedDeveloperId].projects;
    for (const project of projects) {
      const option = document.createElement('option');
      option.value = project.project_id;
      option.textContent = project.project_name;
      projectSelect.appendChild(option);
    }

    // Refresh the selectpicker after modifying the options
    $(projectSelect).selectpicker('refresh');
  }
}

// Call the function to fetch data and populate the Location dropdown initially
fetchData()
  .then(() => {
    populateLocationDropdown();
  });

function logSelectedOptionValues() {
  const locationSelect = document.getElementById('search_location_main');
  const developerSelect = document.getElementById('search_developer_main');
  const projectSelect = document.getElementById('search_project_main');

  // Get the selected values
  const selectedLocationValue = locationSelect.value;
  const selectedDeveloperValue = developerSelect.value;
  const selectedProjectValue = projectSelect.value;

  //console.log('Selected Location Value:', selectedLocationValue);
  //console.log('Selected Developer Value:', selectedDeveloperValue);
  //console.log('Selected Project Value:', selectedProjectValue);
}

// Add event listeners to the dropdowns to log the selected option values on change
$('#search_location_main').on('changed.bs.select', () => {
  populateDeveloperDropdown();
  logSelectedOptionValues();
});

$('#search_developer_main').on('changed.bs.select', () => {
  populateProjectDropdown();
  logSelectedOptionValues();
});

$('#search_project_main').on('changed.bs.select', logSelectedOptionValues);

