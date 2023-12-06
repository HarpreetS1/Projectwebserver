<?php

$uploadsDir = 'uploads/';
$files = scandir($uploadsDir);
$files = array_diff($files, array('.', '..'));

$images = [];

foreach ($files as $file) {
    $images[] = [
        'filename' => $file,
        'url' => $uploadsDir . $file
    ];
}

header('Content-Type: application/json');
echo json_encode($images);
?>
