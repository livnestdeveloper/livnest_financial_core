<?php
// Database connection settings
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'finance';

// Create a new MySQLi connection
$connection = new mysqli($host, $username, $password, $database);

// Check for a connection error
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
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
if (isset($headers['http_project_name'])) {
    $projectName = $headers['http_project_name'];
}


// Query to find the maximum project_id
$query = "SELECT MAX(project_id) AS max_project_id FROM project";

// Execute the query
$result = $connection->query($query);

if ($result) {
    // Fetch the maximum project_id from the result
    $row = $result->fetch_assoc();
    $ProjectId = $row['max_project_id'] + 1;


        // Assuming you have already established a database connection
    
    // Your SQL INSERT query
    $insertQuery = "INSERT INTO project (location_id, developer_id, project_id, project_name) VALUES ('$locationId', '$developerId', '$ProjectId', '$projectName')";
    
    
    // Execute the query
    if ($connection->query($insertQuery) === TRUE) {
      echo(json_encode("Project Added"));
    } else {
        echo(json_encode($connection->error));
    }
    
    // Close the database connection
    $connection->close();
 
} else {
    // Handle query error
    echo "Error executing the query: " . $connection->error;
}

// Close the database connection
$connection->close();
?>
