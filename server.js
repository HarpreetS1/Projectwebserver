const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a route to handle image uploads
app.post('/upload', upload.single('photo'), (req, res) => {
  try {
    // Get the uploaded image data
    const imageBuffer = req.file.buffer;

    // Generate a unique filename
    const filename = `photo_${Date.now()}.jpg`;

    // Save the image to the server
    fs.writeFileSync(`./uploads/${filename}`, imageBuffer);

    console.log(`Image saved: ${filename}`);
    res.status(200).send('Image received and saved successfully.');
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
