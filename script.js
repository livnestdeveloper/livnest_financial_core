// Aside Container
const aside = document.querySelector("aside");


//Array of all the filter options parent div
const filterItems = document.querySelectorAll(".filter-items");

// To Open the filter
const openFilter = () => {
  aside.style.display = aside.style.display === "none" ? "block" : "none";
};

// To toggle the up/down arrow in filter
const handleToggle = (i) => {
  let item = i.nextElementSibling;
  item.style.display = item.style.display === "none" ? "flex" : "none";
};



const addLadderButton = document.getElementById("addLadder");
const addKickerButton = document.getElementById("addKicker");
const addEiButton = document.getElementById("addEi");


addLadderButton.style.display = 'block';
addKickerButton.style.display = 'none';
addEiButton.style.display = 'none';


const handleCategory = (i) => {
 // Get the text content of the clicked filter category
 const category = i.textContent.trim();

 // Hide all divs with class names matching the filter categories
 const divsToHide = document.querySelectorAll('.ladderclass, .kickerclass, .eiclass');
 divsToHide.forEach((div) => {
   div.style.display = 'none';
 });




 // Show the corresponding div based on the selected category
 switch (category) {
   case 'Ladders':
     const ladderDiv = document.getElementById('ladder_div');
     if (ladderDiv) {
       ladderDiv.style.display = 'block';
       addLadderButton.style.display = 'block';
       addKickerButton.style.display = 'none';
       addEiButton.style.display = 'none';
     }
     break;
   case 'Kickers':
     const kickerDiv = document.getElementById('kicker_div');
     if (kickerDiv) {
       kickerDiv.style.display = 'block';
       addKickerButton.style.display = 'block'
       addLadderButton.style.display = 'none';
       addEiButton.style.display = 'none';
     }
     break;
   case 'Executive Incentive':
     const eiDiv = document.getElementById('ei_div');
     if (eiDiv) {
       eiDiv.style.display = 'block';
       addKickerButton.style.display = 'none'
       addLadderButton.style.display = 'none';
       addEiButton.style.display = 'block';
     }
     break;
 }
}




// Special filter (Configuration)
const handleConfig = (i) => {
  const items = i.parentElement.querySelectorAll("div");

  if (i.parentElement.dataset.type == "radio") {
    items.forEach((item) => item.classList.remove("active-config"));
    i.classList.add("active-config");
  } else {
    if (i.classList.contains("active-config")) {
      i.classList.remove("active-config");
    } else {
      i.classList.add("active-config");
    }
  }
};

// Adding active class to the clicked element in the see more table
const handleActiveSeeMore = (i) => {
  const elements = i.parentElement.querySelectorAll("p");
  elements.forEach((item) => item.classList.remove("active-see-more"));
  i.classList.toggle("active-see-more");
};



//Open filter in mobile view
const openMobileFilters = () => {
  aside.style.display = aside.style.display === "flex" ? "none" : "flex";
};

// Data of all the filters
const data = {};

// To Set the searched data in the data object and query backend & get back filtered data
const handleSearch = () => {

// Get the selected values from the dropdowns
const search_location = document.getElementById("search_location_main").value;
const search_developer = document.getElementById("search_developer_main").value;
const search_project = document.getElementById("search_project_main").value;

// Define the URL of the API endpoint
const apiUrl = "http://localhost/newmaster/api/ladder.php";
const apiUrl2 = "http://localhost/newmaster/api/kicker.php";
const apiUrl3 = "http://localhost/newmaster/api/ei.php";


// Create a new Headers object to store the headers
const headers = new Headers();

// Check if search_location is not null and add it as a header
if (search_location !== "") {
  headers.append("HTTP_LOCATION_ID", search_location);
}

// Check if search_developer is not null and add it as a header
if (search_developer !== "") {
  headers.append("HTTP_DEVELOPER_ID", search_developer);
}

// Check if search_project is not null and add it as a header
if (search_project !== "") {
  headers.append("HTTP_PROJECT_ID", search_project);
}

// Create a request object with the headers
const request = new Request(apiUrl, {
  method: "GET",
  headers: headers,
});

const request2 = new Request(apiUrl2, {
  method: "GET",
  headers: headers,
});

const request3 = new Request(apiUrl3, {
  method: "GET",
  headers: headers,
});



// Fetch data from the API using the request for ladder cards
fetch(request)
  .then((response) => response.json())
  .then((jsonData) => {
    // Process the fetched data
    console.log("the recieeved jsondata from headers" , jsonData);

    cardContainer.innerHTML = '';

    jsonData.forEach(data => {
      const card = document.createElement("div");
      card.classList.add("card");

      const label = document.createElement("span");
      label.classList.add("card-label");
      label.textContent = data.project_name;

      const content = document.createElement("div");
      content.classList.add("card-content");

      const simpleline = document.createElement("hr");
      simpleline.className = "card-line";

      const developerInfo = document.createElement("p");
      developerInfo.innerHTML = `Developer: ${data.developer_name}`;

      const dates = document.createElement("p");
      dates.innerHTML = `Start: ${data.ladder_start_date} <br> End: ${data.ladder_end_date}`;

      content.appendChild(developerInfo);
      content.appendChild(simpleline);
      content.appendChild(dates);

      // Check if ladder_extended_date is not null
      if (data.ladder_extended_date !== null) {
        const extendedLabel = document.createElement("span");
        extendedLabel.classList.add("extended-label");
        extendedLabel.textContent = "Extended";

        // Create a small green dot
        const greenDot = document.createElement("span");
        greenDot.classList.add("green-dot");

        // Append the green dot to the extended label
        extendedLabel.appendChild(greenDot);

        content.appendChild(extendedLabel);
      }

      card.appendChild(label);
      card.appendChild(content);

      cardContainer.appendChild(card);
    });

    // ...
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    cardContainer.innerHTML = '';

  });



//fetch data from api for kicker cards
fetch(request2)
  .then((response) => response.json())
  .then((jsonData) => {
    // Process the fetched data
    //console.log("the recieeved jsondata from headers kicker" , jsonData);

    kickercardContainer.innerHTML = '';

    jsonData.forEach(data => {
      const card = document.createElement("div");
      card.classList.add("card");

      const label = document.createElement("span");
      label.classList.add("card-label");
      label.textContent = data.project_name;

      const content = document.createElement("div");
      content.classList.add("card-content");

      const simpleline = document.createElement("hr");
      simpleline.className = "card-line";

      const developerInfo = document.createElement("p");
      developerInfo.innerHTML = `Developer: ${data.developer_name}`;

      const dates = document.createElement("p");
      dates.innerHTML = `Start: ${data.kicker_start_date} <br> End: ${data.kicker_end_date}`;

      content.appendChild(developerInfo);
      content.appendChild(simpleline);
      content.appendChild(dates);

      // Check if ladder_extended_date is not null
      if (data.ladder_extended_date !== null) {
        const extendedLabel = document.createElement("span");
        extendedLabel.classList.add("extended-label");
        extendedLabel.textContent = "Extended";

        // Create a small green dot
        const greenDot = document.createElement("span");
        greenDot.classList.add("green-dot");

        // Append the green dot to the extended label
        extendedLabel.appendChild(greenDot);

        content.appendChild(extendedLabel);
      }

      card.appendChild(label);
      card.appendChild(content);

      kickercardContainer.appendChild(card);
    });

    // ...
  })
  .catch((error) => {
    console.error("Error fetching data kicker:", error);
  });


  //fetching data from api for EI
fetch(request3)
.then((response) => response.json())
.then((jsonData) => {
  // Process the fetched data
  //console.log("the recieeved jsondata from headers EI" , jsonData);

  eicardContainer.innerHTML = '';

  jsonData.forEach(data => {
    const card = document.createElement("div");
    card.classList.add("card");

    const label = document.createElement("span");
    label.classList.add("card-label");
    label.textContent = data.project_name;

    const content = document.createElement("div");
    content.classList.add("card-content");

    const simpleline = document.createElement("hr");
    simpleline.className = "card-line";

    const developerInfo = document.createElement("p");
    developerInfo.innerHTML = `Developer: ${data.developer_name}`;

    const dates = document.createElement("p");
    dates.innerHTML = `Start: ${data.ei_tenure_start_date} <br> End: ${data.ei_tenure_end_date}`;

    content.appendChild(developerInfo);
    content.appendChild(simpleline);
    content.appendChild(dates);

    // Check if ladder_extended_date is not null
    if (data.ladder_extended_date !== null) {
      const extendedLabel = document.createElement("span");
      extendedLabel.classList.add("extended-label");
      extendedLabel.textContent = "Extended";

      // Create a small green dot
      const greenDot = document.createElement("span");
      greenDot.classList.add("green-dot");

      // Append the green dot to the extended label
      extendedLabel.appendChild(greenDot);

      content.appendChild(extendedLabel);
    }

    card.appendChild(label);
    card.appendChild(content);

    eicardContainer.appendChild(card);
  });

  // ...
})
.catch((error) => {
  console.error("Error fetching data kicker:", error);
});

//  console.log(searchDateRange , search_developer , search_location , search_project);
  

};

// Clear All the active filters selected
const handleClearAll = () => {

  filterItems.forEach((item) => {
  

    //type = search
    if (item.dataset.type === "search") {
      $(".selectpicker").selectpicker("deselectAll");

      $(".selectpicker").selectpicker("refresh");
    }

    // type = options
    else if (item.dataset.type === "options") {
      let divs = Array.from(item.querySelectorAll("div"));
      divs.map((ele) => {
        if (ele.classList.contains("active-config")) {
          ele.classList.remove("active-config");
        }
      });
    }

    // type = radio
    else if (item.dataset.type === "radio") {
      let divs = Array.from(item.querySelectorAll("div"));
      divs.map((ele) => {
        if (ele.classList.contains("active-config")) {
          ele.classList.remove("active-config");
        }
      });
    }

    // type = daterange
    else if (item.dataset.type === "daterange") {
      item.querySelector("input").value = "";
    }

    // type = range (budget)
    else if (item.dataset.type === "range") {
      const inputs = item.querySelectorAll("input");
      inputs[0].value = "";
      inputs[1].value = "";
    }
  });


// Assuming you have a reference to your select element with an id="search_location"
var selectElement = document.getElementById("search_location");

// Loop through each option and set its selected property to false
for (var i = 0; i < selectElement.options.length; i++) {
  selectElement.options[i].selected = false;
}


// Assuming you have a reference to your select element with an id="search_developer"
var selectElement = document.getElementById("search_developer");

// Loop through each option and set its selected property to false
for (var i = 0; i < selectElement.options.length; i++) {
  selectElement.options[i].selected = false;
}

// Assuming you have a reference to your select element with an id="search_project"
var selectElement = document.getElementById("search_project");

// Loop through each option and set its selected property to false
for (var i = 0; i < selectElement.options.length; i++) {
  selectElement.options[i].selected = false;
}


};




// Add new lead modal accordions handler
const handleDialogAcc = (i) => {
  i.querySelector(".down-arrow").classList.toggle("rotate");
  i.nextElementSibling.style.display =
    i.nextElementSibling.style.display === "block" ? "none" : "block";
};




// Add New Lead Selected Data Object
const addNewLeadData = {};

// All the elements from the add new lead modal
const dialogAllElements = document.querySelectorAll("[data-att]");



//Open the nested options in the table see more quick updates
const openNestedSeeMore = (i) => {
  i.nextElementSibling.style.display =
    i.nextElementSibling.style.display == "none" ? "block" : "none";
};

// Dynamic code to handle all the modals opening & closing
const openDialog = (id) => {
  const modal = document.getElementById(id);
  modal.style.display = "block";
  modal.showModal();
};
const closeDialog = (id) => {
  const modal = document.getElementById(id);
  modal.style.display = "none";
  modal.close();
};

// Not closing the dialog on click of the esc button
const allDialogs = Array.from(document.getElementsByTagName("dialog"));
allDialogs.forEach((item) => {
  item.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
    }
  });
});




// Get references to the start and end date input elements
const startDateInput = document.getElementById("ladderStartDate");
const endDateInput = document.getElementById("ladderEndDate");
const kickerstartDateInput = document.getElementById("kickerStartDate");
const kickerEndDateInput = document.getElementById("kickerEndDate");
const eistartDateInput = document.getElementById("eiStartDate");
const eiendDateInput = document.getElementById("eiEndDate");

// Add an event listener to the end date input
endDateInput.addEventListener("input", function() {
  const startDateValue = new Date(startDateInput.value);
  const endDateValue = new Date(endDateInput.value);

  if (endDateValue <= startDateValue) {
    alert("End date cannot be less than the start date.");
    endDateInput.value = ""; // Clear the end date input
  }
});


startDateInput.addEventListener("input", function() {
  const startDateValue = new Date(startDateInput.value);
  const endDateValue = new Date(endDateInput.value);

  if (endDateValue => startDateValue) {
    alert("Start date cannot be less than the end date.");
    endDateInput.value = ""; // Clear the end date input
  }
});


kickerEndDateInput.addEventListener("input", function() {
  const kickerstartDateValue = new Date(kickerstartDateInput.value);
  const kickerendDateValue = new Date(kickerEndDateInput.value);

  if (kickerendDateValue <= kickerstartDateValue) {
    alert("End date cannot be less than the start date.");
    kickerEndDateInput.value = ""; // Clear the end date input
  }
});


kickerstartDateInput.addEventListener("input", function() {
  const kickerstartDateValue = new Date(kickerstartDateInput.value);
  const kickerendDateValue = new Date(kickerEndDateInput.value);

  if (kickerendDateValue => kickerstartDateValue) {
    alert("Start date cannot be less than the end date.");
    kickerEndDateInput.value = ""; // Clear the end date input
  }
});


eiendDateInput.addEventListener("input", function() {
  const eistartDateValue = new Date(eistartDateInput.value);
  const eiendDateValue = new Date(eiendDateInput.value);

  if (eiendDateValue <= eistartDateValue) {
    alert("End date cannot be less than the start date.");
    eiendDateInput.value = ""; // Clear the end date input
  }
});


eistartDateInput.addEventListener("input", function() {
  const eistartDateValue = new Date(eistartDateInput.value);
  const eiendDateValue = new Date(eiendDateInput.value);

  if (eiendDateValue => eistartDateValue) {
    alert("Start date cannot be less than the end date.");
    eiendDateInput.value = ""; // Clear the end date input
  }
});


//Add Ladder Stages

let counter = 1;

document.getElementById("addLadderStage").addEventListener("click", function () {

  counter++;


  // Create a new div for the new inputs
  const newDiv = document.createElement("div");
  newDiv.style.height = "38px";
  newDiv.className = "details-item";

  // Create the new input elements
  const minUnitInput = document.createElement("input");
  minUnitInput.placeholder = "Enter Min Unit";
  minUnitInput.id = `stage${counter}_min_unit`;
  minUnitInput.type = "text";
  minUnitInput.setAttribute("data-att", "input");
  minUnitInput.setAttribute("data-value", "name");
  minUnitInput.style.width = "123px";

  const maxUnitInput = document.createElement("input");
  maxUnitInput.placeholder = "Enter Max Unit";
  maxUnitInput.id = `stage${counter}_max_unit`;
  maxUnitInput.type = "text";
  maxUnitInput.setAttribute("data-att", "input");
  maxUnitInput.setAttribute("data-value", "name");
  maxUnitInput.style.width = "123px";

  const percentInput = document.createElement("input");
  percentInput.placeholder = "Percent";
  percentInput.id = `stage${counter}_percent`;
  percentInput.type = "text";
  percentInput.setAttribute("data-att", "input");
  percentInput.setAttribute("data-value", "name");
  percentInput.style.width = "123px";

  // Append the new inputs to the new div
  newDiv.appendChild(minUnitInput);
  newDiv.appendChild(maxUnitInput);
  newDiv.appendChild(percentInput);

  // Append the new div to the 'ladderDeals' div
  const ladderDealsDiv = document.getElementById("dealRow");
  ladderDealsDiv.appendChild(newDiv);


});



//Fetch the ladder cards
const cardContainer = document.getElementById("ladderCards");

// Fetch data from the API endpoint
document.addEventListener("DOMContentLoaded", function () {

fetch("http://localhost/newmaster/api/ladder.php")
  .then(response => response.json())
  .then(jsonData => {
    // Loop through the fetched JSON data and create cards
    jsonData.forEach(data => {
      const card = document.createElement("div");
      card.classList.add("card");

      const label = document.createElement("span");
      label.classList.add("card-label");
      label.textContent = data.project_name;

      const content = document.createElement("div");
      content.classList.add("card-content");

      const simpleline = document.createElement("hr");
      simpleline.className = "card-line";

      const developerInfo = document.createElement("p");
      developerInfo.innerHTML = `Developer: ${data.developer_name}`;

      const dates = document.createElement("p");
      dates.innerHTML = `Start: ${data.ladder_start_date} <br> End: ${data.ladder_end_date}`;

      content.appendChild(developerInfo);
      content.appendChild(simpleline);
      content.appendChild(dates);

      // Check if ladder_extended_date is not null
      if (data.ladder_extended_date !== null) {
        const extendedLabel = document.createElement("span");
        extendedLabel.classList.add("extended-label");
        extendedLabel.textContent = "Extended";

        // Create a small green dot
        const greenDot = document.createElement("span");
        greenDot.classList.add("green-dot");

        // Append the green dot to the extended label
        extendedLabel.appendChild(greenDot);

        content.appendChild(extendedLabel);
      }

      card.appendChild(label);
      card.appendChild(content);

      cardContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
});
  
  
//Fetch the ladder cards
const kickercardContainer = document.getElementById("kickerCards");

// Fetch data from the API endpoint
document.addEventListener("DOMContentLoaded", function () {

fetch("http://localhost/newmaster/api/kicker.php")
  .then(response => response.json())
  .then(jsonData => {
    // Loop through the fetched JSON data and create cards
    jsonData.forEach(data => {
      const card = document.createElement("div");
      card.classList.add("card");

      const label = document.createElement("span");
      label.classList.add("card-label");
      label.textContent = data.project_name;

      const content = document.createElement("div");
      content.classList.add("card-content");

      const simpleline = document.createElement("hr");
      simpleline.className = "card-line";

      const developerInfo = document.createElement("p");
      developerInfo.innerHTML = `Developer: ${data.developer_name}`;

      const dates = document.createElement("p");
      dates.innerHTML = `Start: ${data.kicker_start_date} <br> End: ${data.kicker_end_date}`;

      content.appendChild(developerInfo);
      content.appendChild(simpleline);
      content.appendChild(dates);

      // Check if ladder_extended_date is not null
      if (data.ladder_extended_date !== null) {
        const extendedLabel = document.createElement("span");
        extendedLabel.classList.add("extended-label");
        extendedLabel.textContent = "Extended";

        // Create a small green dot
        const greenDot = document.createElement("span");
        greenDot.classList.add("green-dot");

        // Append the green dot to the extended label
        extendedLabel.appendChild(greenDot);

        content.appendChild(extendedLabel);
      }

      card.appendChild(label);
      card.appendChild(content);

      kickercardContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
});

const eicardContainer = document.getElementById("eiCards");


// Fetch data from the API endpoint
document.addEventListener("DOMContentLoaded", function () {

fetch("http://localhost/newmaster/api/ei.php")
  .then(response => response.json())
  .then(jsonData => {
    // Loop through the fetched JSON data and create cards
    jsonData.forEach(data => {
      const card = document.createElement("div");
      card.classList.add("card");

      const label = document.createElement("span");
      label.classList.add("card-label");
      label.textContent = data.project_name;

      const content = document.createElement("div");
      content.classList.add("card-content");

      const simpleline = document.createElement("hr");
      simpleline.className = "card-line";

      const developerInfo = document.createElement("p");
      developerInfo.innerHTML = `Developer: ${data.developer_name}`;

      const dates = document.createElement("p");
      dates.innerHTML = `Start: ${data.ei_tenure_start_date} <br> End: ${data.ei_tenure_end_date}`;

      content.appendChild(developerInfo);
      content.appendChild(simpleline);
      content.appendChild(dates);

      // Check if ladder_extended_date is not null
      if (data.ladder_extended_date !== null) {
        const extendedLabel = document.createElement("span");
        extendedLabel.classList.add("extended-label");
        extendedLabel.textContent = "Extended";

        // Create a small green dot
        const greenDot = document.createElement("span");
        greenDot.classList.add("green-dot");

        // Append the green dot to the extended label
        extendedLabel.appendChild(greenDot);

        content.appendChild(extendedLabel);
      }

      card.appendChild(label);
      card.appendChild(content);

      eicardContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

});



/* --------------------- search dropdown change options --------------------- */



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


/* --------------------- dropdown change select changed --------------------- */

/* -------------------------- Add project function -------------------------- */





const addNewProject = () => {



}

/* ------------------------ Add project function ends ----------------------- */
