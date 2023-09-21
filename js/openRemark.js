/* ------------------------------- openremark ------------------------------- */

function formatDate(inputDate) {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
}


function openRemark(event) {
    console.log("Modal opened");
    document.getElementById("remarkrowsappend").innerHTML = "";
  
    // Get the clicked row
    var clickedRow = event.target.closest("tr");
  
    // Get a reference to the "Add Follow-up" button
    const addFollowupButton = document.getElementById("add_followup");
  
    // Define and assign the onclick function
    addFollowupButton.onclick = updateUserRemark;
  
    // Define the onclick function
    function updateUserRemark(event) {
      var remark_project_id =
        clickedRow.querySelector(".hidden-project-id").textContent;
      var remark_user_id =
        clickedRow.querySelector(".hidden-user-id").textContent;
      // Log the IDs from the current clicked row
      //console.log("when clicked", remark_project_id, remark_user_id);
      // Your additional function code here
  
      function retrieveFollowupData() {
        const followupData = [];
  
        const remark = document.getElementById("remark").value;
        const followUpDate = document.getElementById("follow_up_date").value;
        const followUpType = document.getElementById("follow_up_type").value;
  
        followupData.push({
          remark: remark,
          followUpDate: followUpDate,
          followUpType: followUpType,
          projectID: remark_project_id,
          userID: remark_user_id,
        });
  
        return followupData;
      }
  
      // Example usage
      const data = retrieveFollowupData();
      console.log("data recieveed", data);
  
      function sendFollowupData(data) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/master/followupupdate.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
  
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log("Data sent successfully!");
            } else {
              console.error("Error sending data:", xhr.status, xhr.statusText);
            }
          }
        };
  
        xhr.send(JSON.stringify(data));
      }
  
      const followupData = retrieveFollowupData();
      sendFollowupData(followupData);
  
      // Set remark, followUpDate, and followUpType as null
      document.getElementById("remark").value = "";
      document.getElementById("follow_up_type").value = "";
      document.getElementById("follow_up_date").value = "0000-00-00";
    }
  }
  
  

  function openRemarkHistory(event) {
    var clickedRow2 = event.target.closest("tr");
  
    // Find the hidden columns containing project_id and user_id
    var remark_project_id2 = clickedRow2.querySelector(".hidden-project-id").textContent;
    var remark_user_id2 = clickedRow2.querySelector(".hidden-user-id").textContent;
  
    function populateFollowupData() {
      const apiUrl = `http://localhost/master/followupfetch.php?user_id=${remark_user_id2}&project_id=${remark_project_id2}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const remarksDiv = document.getElementById("remarksDiv");
  
          // Clear the previous content of the remarksDiv
          remarksDiv.innerHTML = '';
  
          // Create and append table rows for data
          data.forEach((item) => {
            const remarks = document.createElement("div");
            remarks.className = "remarks";
  
            const followUpDate = document.createElement("p");
            followUpDate.textContent = formatDate(item.followup_date);
  
            const statusText = document.createElement("p");
            if (item.followup_type === "client") {
              statusText.textContent = "Client Follow-Up";
              statusText.style.color = "orange";
            } else {
              statusText.textContent = "Developer Follow-Up";
              statusText.style.color = "green";
            }
  
            const remarkText = document.createElement("p");
            remarkText.className = "text";
            remarkText.textContent = item.remark;
  
            // Append the created elements to the remarks container (remarksDiv)
            remarks.appendChild(statusText);
            remarks.appendChild(followUpDate);
            remarks.appendChild(remarkText);
  
            remarksDiv.appendChild(remarks); // Append the remarks to the container
          });
        })
        .catch((error) => console.error("Error fetching follow-up data:", error));
    }
  
    // Call the function to populate the data
    populateFollowupData();
  }
  