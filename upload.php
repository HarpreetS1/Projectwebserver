<?php

$uploadsDir = 'uploads/';

// Check if the 'file' parameter exists in the POST request
if (isset($_FILES["file"])) {
    $targetFile = $uploadsDir . basename($_FILES["file"]["name"]);

    // Move the uploaded file to the target directory
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
        echo "File uploaded successfully!";
    } else {
        echo "Error uploading file.";
    }
} else {
    echo "No file attached to the request.";
}
?>
