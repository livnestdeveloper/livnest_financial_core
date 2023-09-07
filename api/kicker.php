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
$sql = "SELECT
kicker.kicker_id,
kicker.kicker_start_date,
kicker.kicker_end_date,
kicker.kicker_target_in_amount,
kicker.kicker_target_in_unit,
kicker.kicker_in_percent,
kicker.kicker_extended,
kicker.kicker_extended_date,
project.project_id,
project.project_name,
developer.developer_id,
developer.developer_name
FROM
kicker
JOIN
project ON kicker.project_id = project.project_id
JOIN
developer ON kicker.developer_id = developer.developer_id
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
    $filters[] = "kicker.project_id IN ($projectIdList)"; // Specify the table name or alias for project_id
}

// Combine the filters using 'AND' if there are any
if (!empty($filters)) {
    $sql .= " AND " . implode(" AND ", $filters);
}

$sql .= " ORDER BY kicker.kicker_start_date ASC;";

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
