<?php
// Database configuration (update with your database credentials)
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'finance'; // Use the name of your database

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
    $ladderStartDate = $headers['http_start_date'];
}

if (isset($headers['http_end_date'])) {
    $ladderEndDate = $headers['http_end_date'];
}

if (isset($headers['http_ladder_type'])) {
    $ladderType = $headers['http_ladder_type'];
}

if (isset($headers['http_extended_date'])) {
    $ladderExtendedDate = $headers['http_extended_date'];
}

// Define the file path where you want to save the headers
$filePath = 'check2.txt';
$filePath2 = 'error.txt';

// Append the headers to the file
file_put_contents($filePath, json_encode($headers, JSON_PRETTY_PRINT) . PHP_EOL, FILE_APPEND);

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);

    // Set PDO to throw exceptions on errors
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the HTTP request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get the JSON data from the request body (remove json_encode)
        $json_data = file_get_contents("php://input");

        $data = json_decode($json_data, true);

        // SQL query to fetch location_id
        $queryGetLocationId = "SELECT location_id FROM developer WHERE developer_id = :developerId";

        // Prepare and execute the query
        $stmt = $pdo->prepare($queryGetLocationId);
        $stmt->bindParam(':developerId', $developerId, PDO::PARAM_STR);
        $stmt->execute();

        // Fetch the result (assuming there's only one row)
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if a result was found
        if ($result) {
            $locationId = $result['location_id'];
        }

        $queryUpdateExtendedDate = "UPDATE ladder 
                SET Ladder_type = :ladder_type, 
                    ladder_extended_date = :ladder_extended_date
                WHERE location_id = :location_id 
                AND developer_id = :developer_id
                AND project_id = :project_id
                AND ladder_start_date = :ladder_start_date
                AND ladder_end_date = :ladder_end_date";

          // Prepare and execute the query
          $stmt = $pdo->prepare($queryUpdateExtendedDate);
          $stmt->bindParam(':developer_id', $developerId);
          $stmt->bindParam(':location_id', $locationId);
          $stmt->bindParam(':project_id', $projectId);
          $stmt->bindParam(':ladder_start_date', $ladderStartDate );
          $stmt->bindParam(':ladder_end_date', $ladderEndDate);
          $stmt->bindParam(':ladder_type', $ladderType);
          $stmt->bindParam(':ladder_extended_date', $ladderExtendedDate);


          $stmt->execute();
         
          // Fetch the result 
          $result = $stmt->fetch(PDO::FETCH_ASSOC);
         


        $sqlLadder = "UPDATE ladder 
        SET ladder_stage_start = :minValue, 
            ladder_stage_end = :maxValue, 
            stage_percent = :percentValue
        WHERE location_id = :location_id 
          AND developer_id = :developer_id
          AND project_id = :project_id
          AND ladder_stage = :stage
          AND ladder_start_date = :ladder_start_date
          AND ladder_end_date = :ladder_end_date";

        $stmt = $pdo->prepare($sqlLadder);

        foreach ($data as $stageData) {
            // Process each stage's data
            // Access stage-specific data
            $stage = $stageData['stage'];
            $minValue = $stageData['minValue'];
            $maxValue = $stageData['maxValue'];
            $percentValue = $stageData['percentValue'];

            // Create a new prepared statement for each stage
            $stmt = $pdo->prepare("UPDATE ladder 
                                   SET ladder_stage_start = :minValue, 
                                       ladder_stage_end = :maxValue, 
                                       stage_percent = :percentValue
                                   WHERE location_id = :location_id 
                                     AND developer_id = :developer_id
                                     AND project_id = :project_id
                                     AND ladder_stage = :stage
                                     AND ladder_start_date = :ladder_start_date
                                     AND ladder_end_date = :ladder_end_date");

            $stmt->bindParam(':minValue', $minValue);
            $stmt->bindParam(':maxValue', $maxValue);
            $stmt->bindParam(':percentValue', $percentValue);
            $stmt->bindParam(':location_id', $locationId);
            $stmt->bindParam(':developer_id', $developerId);
            $stmt->bindParam(':project_id', $projectId);
            $stmt->bindParam(':stage', $stage);
            $stmt->bindParam(':ladder_start_date', $ladderStartDate);
            $stmt->bindParam(':ladder_end_date', $ladderEndDate);

            if ($stmt->execute()) {
                // Data updated successfully
            } else {
                // Log the SQL error if the update fails
                $error = "SQL Error: " . implode(", ", $stmt->errorInfo()) . "\n";
                file_put_contents($filePath2, $error, FILE_APPEND);
            }

            // Create the query string with actual values
            $query = "UPDATE ladder 
            SET ladder_stage_start = '$minValue', 
                ladder_stage_end = '$maxValue', 
                stage_percent = '$percentValue',
                ladder_stage = '$stage'
            WHERE location_id = '$locationId' 
              AND developer_id = '$developerId'
              AND project_id = '$projectId'
              AND ladder_start_date = '$ladderStartDate'
              AND ladder_end_date = '$ladderEndDate'";

            // Append the query to the specified file
            file_put_contents($filePath2, $query . PHP_EOL, FILE_APPEND);
        }

        // Return a JSON response for success
        $response = ['message' => 'Data received and updated successfully'];
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // Return a JSON response for invalid request method
        $response = ['error' => 'Invalid request method'];
        header('Content-Type: application/json');
        echo json_encode($response);
    }
} catch (PDOException $e) {
    // Return a JSON response for database errors
    $response = ['error' => 'Database error: ' . $e->getMessage()];

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
