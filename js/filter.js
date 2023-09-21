
function handleSearch() {

    function parseDate(dateString) {

      if (!dateString || dateString.trim() === "") {
        return null; // Return null if the dateString is empty or null
      }

        const dateRange = dateString.split(' - ');
      
        const startDateParts = dateRange[0].split('/');
        const endDateParts = dateRange[1].split('/');
      
        // Format the start date
        const formattedStartDate = `${startDateParts[2]}-${startDateParts[0].padStart(2, '0')}-${startDateParts[1].padStart(2, '0')}`;
        
        // Format the end date
        const formattedEndDate = `${endDateParts[2]}-${endDateParts[0].padStart(2, '0')}-${endDateParts[1].padStart(2, '0')}`;
      
        return {
          startDate: formattedStartDate,
          endDate: formattedEndDate
        };
      }
  
  // Example date string

    const table_body = document.getElementById("table_body");

    table_body.innerHTML = '';
  
  // Get the reference to the select element
  const projectSelect = document.getElementById("search_project_main");
  const configurationSelect = document.getElementById("search_configuration");
  const searchba2date = document.getElementById("search_ba_2").value;
  const searchba3date = document.getElementById("search_ba_3").value;
  const searchsdrdate = document.getElementById("search_sdr_date").value;
  const sourcedBySelect = document.getElementById("search_sourced_by");
  const closedeBySelect = document.getElementById("search_closed_by");
  const invoiceStatusSelect = document.getElementById("search_invoice_status");
  const sourceSelect = document.getElementById("search_source");
  const selectedInvoiceProcess = document.getElementById("search_invoice_process");
  const search_by_invoice_date = document.getElementById("search_invoice_date").value;
  const search_follow_up = document.getElementById("search_followup_date").value;
  const search_closure_date = document.getElementById("search_closure_date").value;
  const search_team_lead = document.getElementById("search_team_lead");
  const search_by_tentative_recieved_date = document.getElementById("search_tentative_date").value;
  const gst_check = document.getElementById("search_gst_paid");
  

//  console.log("search_project_main:", projectSelect.value);
//console.log("search_configuration:", configurationSelect.value);
//console.log("search_ba_2:", searchba2date);
//console.log("search_ba_3:", searchba3date);
//console.log("search_sdr_date:", searchsdrdate);
//console.log("search_sourced_by:", sourcedBySelect.value);
//console.log("search_closed_by:", closedeBySelect.value);
//console.log("search_invoice_status:", invoiceStatusSelect.value);
//console.log("search_source:", sourceSelect.value);
//console.log("search_invoice_process:", selectedInvoiceProcess.value);
//console.log("search_invoice_date:", search_by_invoice_date);
//console.log("search_followup_date:", search_follow_up);
//console.log("search_closure_date:", search_closure_date);
//console.log("search_team_lead:", search_team_lead.value);
//console.log("search_tentative_date:", search_by_tentative_recieved_date);
  
  
  
const InvoiceDates = search_by_invoice_date ? parseDate(search_by_invoice_date) : null;
const follow_up_dates = search_follow_up ? parseDate(search_follow_up) : null;
const closure_dates = search_closure_date ? parseDate(search_closure_date) : null;
const tentative_recieved_dates = search_by_tentative_recieved_date ? parseDate(search_by_tentative_recieved_date) : null;
const ba2dates = searchba2date ? parseDate(searchba2date) : null;
const ba3dates = searchba3date ? parseDate(searchba3date) : null;
const sdrdates = searchsdrdate ? parseDate(searchsdrdate) : null;
  
var invoiceStartDate = InvoiceDates ? InvoiceDates.startDate : null;
var invoiceEndDate = InvoiceDates ? InvoiceDates.endDate : null;

var follow_up_start_date = follow_up_dates ? follow_up_dates.startDate : null;
var follow_up_end_date = follow_up_dates ? follow_up_dates.endDate : null;

var closure_start_date = closure_dates ? closure_dates.startDate : null;
var closure_end_date = closure_dates ? closure_dates.endDate : null;

var tentative_start_date = tentative_recieved_dates ? tentative_recieved_dates.startDate : null;
var tentative_end_date = tentative_recieved_dates ? tentative_recieved_dates.endDate : null;

var ba2startDate = ba2dates ? ba2dates.startDate : null;
var ba2endDate = ba2dates ? ba2dates.endDate : null;

var ba3startDate = ba3dates ? ba3dates.startDate : null;
var ba3endDate = ba3dates ? ba3dates.endDate : null;

var sdrstartDate = sdrdates ? sdrdates.startDate : null;
var sdrendDate = sdrdates ? sdrdates.endDate : null;

  
  
  
  
  // Get the selected options
  const selectedProjectOptions = Array.from(projectSelect.selectedOptions).map(option => option.value);
  const selectedConfigurationOptions = Array.from(configurationSelect.selectedOptions).map(option => option.value);
  const selectedSourcedByOptions =  Array.from(sourcedBySelect.selectedOptions).map(option => option.value);
  const selectClosedByOptions = Array.from(closedeBySelect.selectedOptions).map(option => option.value);
  const selectedInvoiceStatusOptions = Array.from(invoiceStatusSelect.selectedOptions).map(option => option.value);
  const selectedSource = Array.from(sourceSelect.selectedOptions).map(option => option.value);
  const selectedInvoiceProcessOptions = Array.from(selectedInvoiceProcess.selectedOptions).map(option => option.value);
  const selectedTeamLeadsOptions = Array.from(search_team_lead.selectedOptions).map(option => option.value);
  const selectedGstPaidOptions  = Array.from(gst_check.selectedOptions).map(option => option.value);
  
  
  
  
  console.log("Selected Project Options:", selectedProjectOptions);
  console.log("Selected Configuration Options:", selectedConfigurationOptions);
  console.log("Selected Sourced By Options:", selectedSourcedByOptions);
  console.log("Selected Closed By Options:", selectClosedByOptions);
  console.log("Selected Invoice Status Options:", selectedInvoiceStatusOptions);
  console.log("Selected Source Options:", selectedSource);
  console.log("Selected team lead options " , selectedTeamLeadsOptions);
  console.log("selected gst paid options" , selectedGstPaidOptions);
  
  
  
  var declaredId ;
  
  
    function fetchUserIds() {
      return new Promise(function (resolve, reject) {
        var inputValue = document.getElementById("name_search").value;
    
        // Check if the input value is not empty
        if (inputValue.trim() !== "") {
          // Encode the input value to be used in the URL
          var encodedInputValue = encodeURIComponent(inputValue);
    
          // Create the URL with the encoded input value
          var url =
            "https://aarnainfra.com/finance/usernamefetch.php?search=" +
            encodedInputValue;
    
          // Make an AJAX request to fetch the user_ids
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                // Parse the JSON response
                var response = JSON.parse(xhr.responseText);
                // Resolve the Promise with the user_ids array
                resolve(response.user_ids);
              } else {
                // Reject the Promise with an error message
                reject("Error fetching user_ids");
              }
            }
          };
          xhr.send();
        } else {
          // Resolve the Promise with null for empty input
          resolve(null);
        }
      });
    }
    
    fetchUserIds()
      .then(function (user_ids) {
        if (user_ids === null) {
          //console.log("No input provided. Proceeding with user_id as null.");
          getuserID(null);
        } else {
          // Use the user_ids array here
         // console.log("Fetched user_ids:", user_ids);
          // Iterate through the user_ids array and call your function for each user_id
          user_ids.forEach(function (user) {
            getuserID(user.User_id);
          });
        }
      })
      .catch(function (error) {
        // Handle errors here
        //console.error("Error fetching user_ids:", error);
        // You can display an error message to the user if needed
      });
    
  
  
  
   function getuserID(fetcheduserID){
    
    //console.log("getting the user id here " , fetcheduserID);
  
  // Create the request options
  const requestOptions = {
    method: "GET",
    headers: {
      "X_SELECTED_PROJECTS": selectedProjectOptions.join(",")
    }
  };
  
  // Add X_SELECTED_CONFIGURATIONS header if selectedConfigurationOptions is not empty
  if (selectedConfigurationOptions.length > 0) {
    requestOptions.headers["X_SELECTED_CONFIGURATIONS"] = selectedConfigurationOptions.join(",");
  }
  
  if(selectedSource.length > 0){
    requestOptions.headers["X_SELECTED_SOURCES"] = selectedSource.join(",");
  }
  
  if(selectedTeamLeadsOptions.length > 0){
    requestOptions.headers["X_SELECTED_TEAM_LEADS"] = selectedTeamLeadsOptions.join(",");
  }
  
  if(selectedInvoiceStatusOptions.length > 0){
    requestOptions.headers["X_SELECTED_INVOICE_STATUS"] = selectedInvoiceStatusOptions.join(",");
  }
  
  if(selectedSourcedByOptions.length > 0){
    requestOptions.headers["X_SELECTED_SOURCED_BY"] = selectedSourcedByOptions.join(",");
  }
  
  if(selectClosedByOptions.length > 0){
    requestOptions.headers["X_SELECTED_CLOSED_BY"] = selectClosedByOptions.join(",");
  }
  
  
  if(selectClosedByOptions.length > 0){
    requestOptions.headers["X_SELECTED_CLOSED_BY"] = selectClosedByOptions.join(",");
  }
  
  if(selectedInvoiceProcessOptions.length > 0){
    requestOptions.headers["X_SELECTED_INVOICE_PROCESS"] = selectedInvoiceProcessOptions.join(",");
  }
  
  /* if(deal_check == "1" || deal_check == "0"){
    requestOptions.headers["X_DEAL_STATUS"] = deal_check;
  } */
  
  if(selectedGstPaidOptions.length > 0){
    requestOptions.headers["X_GST_PAID"] = selectedGstPaidOptions.join(",");
  }
  
  if (invoiceStartDate !== null) {
    requestOptions.headers["X_INVOICE_START_DATE"] = invoiceStartDate;
    requestOptions.headers["X_INVOICE_END_DATE"] = invoiceEndDate;
  }
  
  if (follow_up_start_date !== null) {
    requestOptions.headers["X_FOLLOWUP_START_DATE"] = follow_up_start_date;
    requestOptions.headers["X_FOLLOWUP_END_DATE"] = follow_up_end_date;
  }
  
  if (closure_start_date !== null) {
    requestOptions.headers["X_CLOSURE_START_DATE"] = closure_start_date;
    requestOptions.headers["X_CLOSURE_END_DATE"] = closure_end_date;
  }
  
  if(tentative_start_date !== null){
    requestOptions.headers["X_TENTATIVE_FUND_START_DATE"] = tentative_start_date;
    requestOptions.headers["X_TENTATIVE_FUND_END_DATE"] = tentative_end_date;
  }
  
  if(fetcheduserID !== null){
    var converteduserID = String(fetcheduserID);
    requestOptions.headers["X_SELECTED_USER_ID"] = converteduserID;
  }
  
  if(ba2startDate !== null){
    requestOptions.headers["X_BA2_START_DATE"] = ba2startDate;
    requestOptions.headers["X_BA2_END_DATE"] = ba2endDate;
  }
  
  if(ba3startDate !== null){
    requestOptions.headers["X_BA3_START_DATE"] = ba3startDate;
    requestOptions.headers["X_BA3_END_DATE"] = ba3endDate;
  }
  
  if(sdrstartDate !== null){
    requestOptions.headers["X_SDR_START_DATE"] = sdrstartDate;
    requestOptions.headers["X_SDR_END_DATE"] = sdrendDate;
  }

  console.log("requested options are" , requestOptions);
  
  // Make the fetch request
  fetch("http://localhost/master/test.php", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log("data getting from first response" , data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  
  
  
  
  
  //console.log(constructedURL);
  
  
  //fetch data in rows
  
  
  // Fetch JSON data from the API
  fetch('http://localhost/master/test.php', requestOptions) // Use the constructed URL
      .then(response => response.text()) // Fetch response as text
      .then(responseText => {
         // console.log("Received Response Text:", responseText); // Debugging line
          return JSON.parse(responseText); // Parse JSON
      })
      .then(jsonData => {
       // console.log("before for loop" , jsonData);
          // Loop through each item in the JSON data
          for (const item of jsonData) {
           // console.log("after for loop" , item);
              // Create a new row element
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
                <p onclick="openDialog('remarks-dialog'); handleActiveSeeMore(this); openRemarkHistory(event)">
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
  
              // Add the row to the table body
              table_body.appendChild(row);
          }
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
  
   }
  
  
  };
  