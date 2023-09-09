<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "finance";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, HTTP_LOCATION_ID, HTTP_DEVELOPER_ID, HTTP_PROJECT_ID");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize variables for headers
$locationId = null;
$developerId = null;
$projectId = null;

// Check if location_id header is set
$headers = getallheaders();
if (isset($headers['http_location_id'])) {
    $locationId = $headers['http_location_id'];
}

// Check if developer_id header is set
if (isset($headers['http_developer_id'])) {
    $developerId = $headers['http_developer_id'];
}

// Check if project_id header is set
if (isset($headers['http_project_id'])) {
    $projectId = $headers['http_project_id'];
}






// SQL query to fetch data with optional filters
$sql = "SELECT ei.ei_id, ei.developer_id, ei.project_id, ei.ei_tenure_start_date, ei.ei_tenure_end_date, ei.ei_target_amount, ei.ei_percent, ei.ei_target_unit, ei.ei_extended_date, project.project_name, developer.developer_name
        FROM ei
        JOIN project ON ei.project_id = project.project_id
        JOIN developer ON ei.developer_id = developer.developer_id
        WHERE 1=1 ";

$filters = array(); // Initialize an array to store the filters

// Add optional filters based on headers
if (!empty($locationId)) {
    $filters[] = "project.location_id = $locationId"; // Specify the table name or alias for location_id
}

if (!empty($developerId)) {
    $filters[] = "developer.developer_id = $developerId"; // Specify the table name or alias for developer_id
}

if (!empty($projectId)) {
    $projectIdArray = explode(',', $projectId); // Convert comma-separated values to an array
    $projectIdList = implode(', ', $projectIdArray); // Convert the array back to a comma-separated list
    $filters[] = "ei.project_id IN ($projectIdList)"; // Specify the table name or alias for project_id
}

// Combine the filters using 'AND' if there are any
if (!empty($filters)) {
    $sql .= " AND " . implode(" AND ", $filters);
}

$sql .= ";";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Close the database connection
    $conn->close();
    // Send the data as JSON response
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // No results found
    echo "No data found.";
}

?>
