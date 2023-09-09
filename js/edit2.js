let dropdownData; // Store the fetched data globally

async function fetchData() {
  const response = await fetch('http://localhost/newmaster/api/dropdown.php');
  dropdownData = await response.json();
}

// Function to populate the Developer dropdown initially
function populateDeveloperDropdownLadder() {
  const developerSelectLadder = document.getElementById('search_developer_ladder');
  developerSelectLadder.innerHTML = '<option value="">Select Developer</option>';

  for (const locationId in dropdownData) {
    const developers = dropdownData[locationId].developers;
    for (const developerId in developers) {
      const option = document.createElement('option');
      option.value = developerId;
      option.textContent = developers[developerId].developer_name;
      developerSelectLadder.appendChild(option);
    }
  }

  // Refresh the selectpicker after modifying the options
  $(developerSelectLadder).selectpicker('refresh');
}

// Function to populate the Project dropdown based on the selected Developer
function populateProjectDropdownLadder() {
  const developerSelectLadder = document.getElementById('search_developer_ladder');
  const projectSelectLadder = document.getElementById('search_project_ladder');

  const selectedDeveloperId = developerSelectLadder.value;
  projectSelectLadder.innerHTML = '<option value="">Select Project</option>';

  if (selectedDeveloperId) {
    for (const locationId in dropdownData) {
      const developers = dropdownData[locationId].developers;
      if (developers[selectedDeveloperId]) {
        const projects = developers[selectedDeveloperId].projects;
        for (const project of projects) {
          const option = document.createElement('option');
          option.value = project.project_id;
          option.textContent = project.project_name;
          projectSelectLadder.appendChild(option);
        }
        break; // No need to continue searching for locations
      }
    }

    // Refresh the selectpicker after modifying the options
    $(projectSelectLadder).selectpicker('refresh');
  }
}

function logSelectedOptionValuesLadder() {
  const developerSelectLadder = document.getElementById('search_developer_ladder');
  const projectSelectLadder = document.getElementById('search_project_ladder');

  // Get the selected values
  const selectedDeveloperValue = developerSelectLadder.value;
  const selectedProjectValue = projectSelectLadder.value;

  //console.log('Selected Developer Value:', selectedDeveloperValue);
  //console.log('Selected Project Value:', selectedProjectValue);
}

// Call the function to fetch data and populate the Developer dropdown initially
fetchData()
  .then(() => {
    populateDeveloperDropdownLadder();
  });

// Add an event listener to the Developer dropdown to populate the Project dropdown
$('#search_developer_ladder').on('changed.bs.select', () => {
  populateProjectDropdownLadder();
  logSelectedOptionValuesLadder();
});


