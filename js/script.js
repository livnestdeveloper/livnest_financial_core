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



function formatDateHuman(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
  return formattedDate;
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


/* --------------- FILLING ALL THE MULTISELECT DROPDOWN VALUES -------------- */


/* --------- starting fetch project id from the booked clients database -------- */

fetch("https://aarnainfra.com/finance/projectapi.php")
    .then(response => response.json())
    .then(jsonData => {
        const projectSelect = document.getElementById("search_project_main");
        let optionsHTML = ""; // Build the options as a string

        jsonData.forEach(project => {
            optionsHTML += `<option value="${project.project_id}">${project.project_name}</option>`;
        });

        // Set the innerHTML once
        projectSelect.innerHTML = optionsHTML;

        // Initialize the select picker
        $('.selectpicker').selectpicker('refresh');
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });



    fetch("https://aarnainfra.com/finance/projectapi.php?team_lead")
    .then(response => response.json())
    .then(jsonData => {
        const teamLeadSelect = document.getElementById("search_team_lead");

        jsonData.forEach(team => {
            const option = document.createElement("option");
            option.value = team.sales_user_id;
            option.textContent = team.user_name;
            teamLeadSelect.appendChild(option);
        });

        // Initialize the select picker
        $('.selectpicker').selectpicker('refresh');
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });


    fetch("https://aarnainfra.com/finance/projectapi.php?configuration")
    .then(response => response.json())
    .then(jsonData => {
        const configSelect = document.getElementById("search_configuration");

        jsonData.forEach(configuration => {
            const option = document.createElement("option");
            option.value = configuration.configuration_id;
            option.textContent = configuration.configuration_name;
            configSelect.appendChild(option);
        });

        // Initialize the select picker
        $('.selectpicker').selectpicker('refresh');
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });


    fetch("https://aarnainfra.com/finance/projectapi.php?employee")
    .then(response => response.json())
    .then(jsonData => {
        const sourceBySelect = document.getElementById("search_sourced_by");

        jsonData.forEach(sourceby => {
            const option = document.createElement("option");
            option.value = sourceby.sales_user_id;
            option.textContent = sourceby.user_name;
            sourceBySelect.appendChild(option);
        });

        // Initialize the select picker
        $('.selectpicker').selectpicker('refresh');
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });


    fetch("https://aarnainfra.com/finance/projectapi.php?employee")
    .then(response => response.json())
    .then(jsonData => {
        const closedeBySelect = document.getElementById("search_closed_by");

        jsonData.forEach(closeby => {
            const option = document.createElement("option");
            option.value = closeby.sales_user_id;
            option.textContent = closeby.user_name;
            closedeBySelect.appendChild(option);
        });

        // Initialize the select picker
        $('.selectpicker').selectpicker('refresh');
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });


    fetch("https://aarnainfra.com/finance/projectapi.php?source")
    .then(response => response.json())
    .then(jsonData => {
        const sourceSelect = document.getElementById("search_source");

        jsonData.forEach(source => {
            const option = document.createElement("option");
            option.value = source.source_id;
            option.textContent = source.source_name;
            sourceSelect.appendChild(option);
        });

        // Initialize the select picker
        $('.selectpicker').selectpicker('refresh');
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });


    /* --------------- FILLING ALL THE MULTISELECT DROPDOWN VALUES END-------------- */



    /* ------------- DISPLAY ALL THE DATA IN THE TABLE AT THE START ------------- */
/* ------------------- fetch all the rows at the starting ------------------- */
const tbody = document.getElementById("table_body");


// Function to handle the "SeeMore" click event
function handleSeeMoreClick(event) {
    // Toggle the visibility of the corresponding "see-more" div
    const seeMoreDiv = event.target.nextElementSibling;
    seeMoreDiv.style.display = seeMoreDiv.style.display === "none" ? "block" : "none";
}




// Fetch JSON data from the API
fetch("https://aarnainfra.com/finance/newapi.php")
    .then(response => response.json()) // Fetch response as JSON
    .then(jsonData => {
        // Loop through each item in the JSON data
        jsonData.forEach(item => {
            const row = document.createElement("tr");

            // Define the values for each column in the row
            const columnValues = [
              item.client_name,
              item.basic_cost,
              item.project_name,
              item.configuration_name,
              item.ob_show_name,
              item.brokerage_percent === null ? "2" : item.brokerage_percent,
              item.closure_date,
              item.Invoice_Raised === '0' ? "Not Raised" : "Raised"
          ];
          

          // Loop through columnValues and create table cells
          for (const value of columnValues) {
              const cell = document.createElement("td");
              cell.innerHTML = value;
              row.appendChild(cell);
          }
          
          // Create a special cell for the see-more section
          const seeMoreCell = document.createElement("td");
          seeMoreCell.setAttribute("data-label", "see-more");
          seeMoreCell.setAttribute("style", "position: relative; cursor: pointer");
          
          const seeMoreContent = `
              <img src="./images/SeeMore.svg" alt="see-more" />
              <div class="see-more" style="display: none">
                <p onclick="openDialog('remarks-dialog'); handleActiveSeeMore(this); openRemark(event)">
                  Remarks
                </p>
                <p onclick="openDialog('remarks-history-dialog'); handleActiveSeeMore(this); openRemarkHistory(event)">
                  Remark History
                </p>
                <p onclick="openDialog('update-client'); handleActiveSeeMore(this)">
                  Update
                </p>
                <p onclick="handleActiveSeeMore(this)">
                  Generate Invoice
                </p>
              </div>
          `;
          
          seeMoreCell.innerHTML = seeMoreContent;
          row.appendChild(seeMoreCell);


            // Create a hidden cell for project_id
            const project_idCell = document.createElement("td");
            project_idCell.style.display = "none";
            project_idCell.className = "hidden-project-id";
            project_idCell.innerHTML = item.project_id;
            row.appendChild(project_idCell);

            // Create a hidden cell for user_id
            const user_idCell = document.createElement("td");
            user_idCell.style.display = "none";
            user_idCell.className = "hidden-user-id";
            user_idCell.innerHTML = item.user_id;
            row.appendChild(user_idCell);
            row.appendChild(seeMoreCell);


            // Add the row to the table body
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });



