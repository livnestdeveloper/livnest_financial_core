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
    $EiStartDate = $headers['http_start_date'];
}

if (isset($headers['http_end_date'])) {
    $EiEndDate = $headers['http_end_date'];
}

if (isset($headers['http_target_amount'])) {
    $EiTargetAmount = $headers['http_target_amount'];
}

if (isset($headers['http_target_unit'])) {
    $EiTargetUnit = $headers['http_target_unit'];
}

if (isset($headers['http_target_percent'])) {
    $EiTargetPercent = $headers['http_target_percent'];
}

// Convert the headers to a JSON string
$headersJson = json_encode($headers, JSON_PRETTY_PRINT);

// Define the file path where you want to save the headers
$filePath = 'check2.txt';

// Append the headers to the file
file_put_contents($filePath, $headersJson . PHP_EOL, FILE_APPEND);


// Convert all variables to an array
$errorData = array(
    'developerId' => $developerId,
    'projectId' => $projectId,
    'EiStartDate' => $EiStartDate,
    'EiEndDate' => $EiEndDate,
    'EiTargetAmount' => $EiTargetAmount,
    'EiTargetUnit' => $EiTargetUnit,
    'EiTargetPercent' => $EiTargetPercent
);



// Check if developer_id is set before executing SQL queries
if ($developerId !== null) {

    // Convert the error data to JSON
    $errorJson = json_encode($errorData, JSON_PRETTY_PRINT);
    
    // Define the file path where you want to save the error message
    $errorFilePath = 'error.txt';
    
    // Append the error message to the file
    file_put_contents($errorFilePath, $errorJson . PHP_EOL, FILE_APPEND);


    // Query to find the maximum project_id
    $queryGetLocationId = "SELECT location_id FROM developer WHERE developer_id =  '$developerId'";

    // Execute the query
    $result = $connection->query($queryGetLocationId);



    if ($result) {
        $row = $result->fetch_assoc();
        $locationId = $row['location_id'];

        // Use prepared statements to insert data safely
        $insertNewEi = $connection->prepare("INSERT INTO ei (location_id, developer_id, project_id, ei_tenure_start_date , ei_tenure_end_date , ei_target_amount , ei_target_unit , ei_percent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

        if ($insertNewEi) {
            $insertNewEi->bind_param("iiisssss", $locationId, $developerId, $projectId, $EiStartDate, $EiEndDate, $EiTargetAmount, $EiTargetUnit, $EiTargetPercent);

            if ($insertNewEi->execute()) {
                echo(json_encode("Ei Added"));
            } else {
                echo(json_encode($insertNewEi->error));
                
            }

            $insertNewEi->close();
        } else {
            echo(json_encode($connection->error));
        }
    } else {
        // Handle query error
        echo(json_encode("Error executing the query: " . $connection->error));
       
    }
}

// Close the database connection
$connection->close();
?>
