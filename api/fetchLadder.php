<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "finance";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$headers = getallheaders();
//print_r($headers);

if (isset($headers['http_developer_id'])) {
    $developerId = $headers['http_developer_id'];
}

// Check if project_id header is set
if (isset($headers['http_project_id'])) {
    $projectId = $headers['http_project_id'];
}

// Check if other headers are set
if (isset($headers['http_start_date'])) {
    $startDate = $headers['http_start_date'];
}

if (isset($headers['http_end_date'])) {
    $endDate = $headers['http_end_date'];
}

$sql = "SELECT * FROM ladder WHERE 1";

if (!empty($developerId)) {
    $developerId = intval($developerId); // Sanitize input
    $sql .= " AND developer_id = $developerId";
}

if (!empty($projectId)) {
    $projectId = intval($projectId); // Sanitize input
    $sql .= " AND project_id = $projectId";
}

if (!empty($startDate)) {
    $startDate = str_replace("'", "", $startDate); // Remove single quotes
    $sql .= " AND ladder_start_date >= '$startDate'";
}

if (!empty($endDate)) {
    $endDate = str_replace("'", "", $endDate); // Remove single quotes
    $sql .= " AND ladder_end_date <= '$endDate'";
}


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
