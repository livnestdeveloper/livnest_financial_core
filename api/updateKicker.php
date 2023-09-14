<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'finance';

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Initialize variables for headers
$locationId = null;
$developerId = null;

// Check if developer_id header is set
$headers = getallheaders();

if (isset($headers['http_developer_id'])) {
    $developerId = $headers['http_developer_id'];
}

// Check if project_id header is set
if (isset($headers['http_project_id'])) {
    $projectId = $headers['http_project_id'];
}

// Check if other headers are set
if (isset($headers['http_start_date'])) {
    $kickerStartDate = $headers['http_start_date'];
}

if (isset($headers['http_end_date'])) {
    $kickerEndDate = $headers['http_end_date'];
}

if (isset($headers['http_target_amount'])) {
    $kickerTargetAmount = $headers['http_target_amount'];
}

if (isset($headers['http_target_unit'])) {
    $kickerTargetUnit = $headers['http_target_unit'];
}

if (isset($headers['http_target_percent'])) {
    $kickerTargetPercent = $headers['http_target_percent'];
}

if (isset($headers['http_extended_date'])) {
    $kickerExtendedDate = $headers['http_extended_date'];
}

// Convert the headers to a JSON string
$headersJson = json_encode($headers, JSON_PRETTY_PRINT);

// Define the file path where you want to save the headers
$filePath = 'check2.txt';

// Append the headers to the file

if($kickerExtendedDate == "" ){
    $kickerExtendedDate = null;
} else {
   
}
$queryGetLocationId = "SELECT location_id FROM developer WHERE developer_id = '$developerId'";

// Execute the query
$result = $connection->query($queryGetLocationId);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $locationId = $row['location_id'];
}
// Construct the SQL query

$updateSql = "UPDATE kicker SET Kicker_target_in_amount = $kickerTargetAmount, Kicker_target_in_unit = $kickerTargetUnit, kicker_in_percent = $kickerTargetPercent, kicker_extended_date = '$kickerExtendedDate'
    WHERE location_id = $locationId AND developer_id = $developerId AND project_id = $projectId AND kicker_start_date = '$kickerStartDate' AND kicker_end_date = '$kickerEndDate'";

// Execute the query and capture errors
if ($connection->query($updateSql) === TRUE) {
    echo(json_encode("Kicker Updated"));
    // Log the SQL query
    file_put_contents('check2.txt', "SQL Query: $updateSql\n", FILE_APPEND);
} else {
    // If there's an error, append it to the check2.txt file along with more details, including the SQL query
    $error = "Error: " . $connection->error;
    $error .= "\nSQL Query: $updateSql";
    echo(json_encode($error));
}

// Close the database connection
$connection->close();
?>
