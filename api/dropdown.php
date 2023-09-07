<?php
 $servername = "localhost";
 $username = "root";
 $password = "";
$dbname = "finance"; // Replace with your actual database name

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Retrieve data from the database
$sql = "SELECT l.location_id, l.location_name, d.developer_id, d.developer_name, p.project_id, p.project_name
        FROM location l
        INNER JOIN developer d ON l.location_id = d.location_id
        INNER JOIN project p ON d.developer_id = p.developer_id
        ORDER BY l.location_id, d.developer_id, p.project_id";

$stmt = $conn->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Organize the data in the desired format (nested array)
$response = array();
foreach ($data as $row) {
    $locationId = $row['location_id'];
    $locationName = $row['location_name'];
    $developerId = $row['developer_id'];
    $developerName = $row['developer_name'];
    $projectId = $row['project_id'];
    $projectName = $row['project_name'];

    // Create nested arrays for location, developer, and project
    if (!isset($response[$locationId]['location_name'])) {
        $response[$locationId]['location_name'] = $locationName;
    }
    if (!isset($response[$locationId]['developers'][$developerId]['developer_name'])) {
        $response[$locationId]['developers'][$developerId]['developer_name'] = $developerName;
    }

    // Add the project to the appropriate developer under the location
    $response[$locationId]['developers'][$developerId]['projects'][] = array(
        'project_id' => $projectId,
        'project_name' => $projectName
    );
}

// Set the response headers
header('Content-Type: application/json');

// Return the JSON response
echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

// Close the database connection
$conn = null;
?>
