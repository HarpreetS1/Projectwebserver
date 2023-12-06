<?php

$uploadsDir = 'uploads/';

// Get all files in the uploads directory
$files = scandir($uploadsDir);

// Filter out "." and ".." directories
$files = array_diff($files, array('.', '..'));

// Create an array to store image information
$images = [];

// Iterate through the files
foreach ($files as $file) {
    $images[] = [
        'filename' => $file,
        'url' => $uploadsDir . $file
    ];
}

// Output the array as JSON
header('Content-Type: application/json');
echo json_encode($images);
?>
