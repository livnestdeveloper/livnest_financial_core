<?php
// Database configuration (update with your database credentials)
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'finance'; // Use the name of the database you created

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
        $project_id = $_POST['project_id'];

        // Prepare an SQL statement to insert the file data and additional data into the database
        $stmt = $pdo->prepare("INSERT INTO files (file_name, file_data, file_type, creative_start_date, creative_end_date , project_id , developer_id) VALUES (:file_name, :file_data, :file_type, :creative_start_date, :creative_end_date , :project_id , :developer_id)");
        $stmt->bindParam(':file_name', $file_name);
        $stmt->bindParam(':file_data', $file_data, PDO::PARAM_LOB);
        $stmt->bindParam(':file_type', $file_type);
        $stmt->bindParam(':creative_start_date', $creative_start_date);
        $stmt->bindParam(':creative_end_date', $creative_end_date);
        $stmt->bindParam(':project_id', $project_id);
        $stmt->bindParam(':developer_id', $developer_id);



        // Execute the SQL statement
        if ($stmt->execute()) {
            $response = ['message' => 'File uploaded successfully'];
        } else {
            $response = ['error' => 'Error uploading file'];
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
