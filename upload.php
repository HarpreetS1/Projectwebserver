<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Handle photo upload
    $fileFieldName = "file";
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES[$fileFieldName]["name"]);

    if (move_uploaded_file($_FILES[$fileFieldName]["tmp_name"], $targetFile)) {
        echo "Photo uploaded successfully.";
    } else {
        echo "Error uploading photo.";
    }

    // Get GPS data
    $latitude = isset($_SERVER["HTTP_LATITUDE"]) ? $_SERVER["HTTP_LATITUDE"] : "N/A";
    $longitude = isset($_SERVER["HTTP_LONGITUDE"]) ? $_SERVER["HTTP_LONGITUDE"] : "N/A";

    echo "Latitude: " . $latitude . "<br>";
    echo "Longitude: " . $longitude . "<br>";

    // Save GPS data to a database or perform other actions as needed
    // ...

    // Display map with location
    echo '<iframe width="600" height="450" frameborder="0" style="border:0" src="https://maps.google.com?q=' . $latitude . ',' . $longitude . '&output=embed"></iframe>';
} else {
    echo "Invalid request.";
}
?>
