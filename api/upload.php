<?php
// Database configuration (update with your database credentials)
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'finance'; // Use the name of the database you created

$filePath2 = 'error.txt';

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);

    // Set PDO to throw exceptions on errors
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if a file was uploaded
    if (isset($_FILES['file'])) {
        $file_name = $_FILES['file']['name'];
        $file_data = file_get_contents($_FILES['file']['tmp_name']);

        // Additional data
        $file_type = $_POST['file_type'];
        $creative_start_date = $_POST['creative_start_date'];
        $creative_end_date = $_POST['creative_end_date'];
        $developer_id = $_POST['developer_id'];
        $project_ids = $_POST['project_id']; // Project IDs as a comma-separated string

        // Split the comma-separated project IDs into an array
        $project_ids_array = explode(',', $project_ids);

        // Iterate through each project ID and insert the file
        foreach ($project_ids_array as $project_id) {
            // Prepare an SQL statement to insert the file data and additional data into the database
            $stmt = $pdo->prepare("INSERT INTO files (file_name, file_data, file_type, creative_start_date, creative_end_date, project_id, developer_id) VALUES (:file_name, :file_data, :file_type, :creative_start_date, :creative_end_date, :project_id, :developer_id)");
            $stmt->bindParam(':file_name', $file_name);
            $stmt->bindParam(':file_data', $file_data, PDO::PARAM_LOB);
            $stmt->bindParam(':file_type', $file_type);
            $stmt->bindParam(':creative_start_date', $creative_start_date);
            $stmt->bindParam(':creative_end_date', $creative_end_date);
            $stmt->bindParam(':project_id', $project_id); // Use the current project ID
            $stmt->bindParam(':developer_id', $developer_id);

            // Execute the SQL statement for the current project ID
            if ($stmt->execute()) {
                $response = ['message' => 'File uploaded successfully for Project ID ' . $project_id];
            } else {
                $response = ['error' => 'Error uploading file for Project ID ' . $project_id];
            }
        }
    } else {
        $response = ['error' => 'No file uploaded'];
    }

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
} catch (PDOException $e) {
    $response = ['error' => 'Database error: ' . $e->getMessage()];

    // Return a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
