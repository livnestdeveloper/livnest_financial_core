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




// Convert all variables to an array
$errorData = array(
    'developerId' => $developerId,
    'projectId' => $projectId,
    'kickerStartDate' => $kickerStartDate,
    'kickerEndDate' => $kickerEndDate,
    'kickerTargetAmount' => $kickerTargetAmount,
    'kickerTargetUnit' => $kickerTargetUnit,
    'kickerTargetPercent' => $kickerTargetPercent
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
        $insertNewkicker = $connection->prepare("INSERT INTO kicker (location_id, developer_id, project_id, kicker_start_date , kicker_end_date , Kicker_target_in_amount , Kicker_target_in_unit , kicker_in_percent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

        if ($insertNewkicker) {
            $insertNewkicker->bind_param("iiisssss", $locationId, $developerId, $projectId, $kickerStartDate, $kickerEndDate, $kickerTargetAmount, $kickerTargetUnit, $kickerTargetPercent);

            if ($insertNewkicker->execute()) {
                echo(json_encode("kicker Added"));
            } else {
                echo(json_encode($insertNewkicker->error));
                
            }

            $insertNewkicker->close();
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
