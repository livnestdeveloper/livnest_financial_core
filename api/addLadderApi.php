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




 //Convert the headers to a JSON string
$headersJson = json_encode($headers, JSON_PRETTY_PRINT);

// Define the file path where you want to save the headers
$filePath = 'check2.txt';

// Append the headers to the file
file_put_contents($filePath, $headersJson . PHP_EOL, FILE_APPEND);



try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);

    // Set PDO to throw exceptions on errors
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    // Check if the HTTP request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Additional data fields
        //$date = $_POST['date']; // Assuming 'date' is sent as a POST parameter
        //$id = $_POST['id']; // Assuming 'id' is sent as a POST parameter

        // Get the JSON data from the request body
        $json_data = file_get_contents("php://input");

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
        // Decode the JSON data into a PHP array
        $data = json_decode($json_data, true);

        if (is_array($data)) {
            foreach ($data as $stageKey => $stageData) {
                // Process each stage's data
                if (is_array($stageData)) {
                    // Access 'min_unit', 'max_unit', and 'percent' inside $stageData
                    $min_unit = $stageData['min_unit'];
                    $max_unit = $stageData['max_unit'];
                    $percent = $stageData['percent'];

                    // Insert or process data as needed for each stage
                    // You can use $stageKey to identify the stage

                    // Example: Insert data into the database
                     $stmt = $pdo->prepare("INSERT INTO ladder (Ladder_type, location_id , developer_id, project_id , ladder_stage, ladder_stage_start, ladder_stage_end, stage_percent, ladder_start_date , ladder_end_date) 
                                          VALUES (:Ladder_type, :location_id , :developer_id, :project_id , :ladder_stage, :ladder_stage_start, :ladder_stage_end, :stage_percent, :ladder_start_date , :ladder_end_date)");
                    $stmt->bindParam(':Ladder_type', $ladderType);
                    $stmt->bindParam(':location_id', $locationId);
                    $stmt->bindParam(':developer_id', $developerId);
                    $stmt->bindParam(':project_id', $projectId);
                    $stmt->bindParam(':ladder_stage', $stageKey);
                    $stmt->bindParam(':ladder_stage_start', $min_unit);
                    $stmt->bindParam(':ladder_stage_end', $max_unit);
                    $stmt->bindParam(':stage_percent', $percent);
                    $stmt->bindParam(':ladder_start_date', $ladderStartDate);
                    $stmt->bindParam(':ladder_end_date', $ladderEndDate);
                    $stmt->execute();

                    // Store the data in a string
                $stageDataString = "Stage: $stageKey\nMin Unit: $min_unit\nMax Unit: $max_unit\nPercent: $percent\n\n";

                // Append the data to the ladder.txt file
                file_put_contents('ladder.txt', $stageDataString, FILE_APPEND);

                }
            }

            // Return a JSON response
            $response = ['message' => 'Data received and processed successfully'];
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = ['error' => 'Invalid JSON data'];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    } else {
        $response = ['error' => 'Invalid request method'];
        header('Content-Type: application/json');
        echo json_encode($response);
    }
} catch (PDOException $e) {
    $response = ['error' => 'Database error: ' . $e->getMessage()];

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
