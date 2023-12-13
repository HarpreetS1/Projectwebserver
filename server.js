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
//rename old file
    fs.rename( './uploads/latest-image.png}', `./uploads/${filename}`, callback )
    // Save the image to the server
    fs.writeFileSync(`./uploads/latest-image.png}`, imageBuffer);

    console.log(`Image saved: latest-image.png `);
    res.status(200).send('Image received and saved successfully.');
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Endpoint to fetch the latest uploaded image
app.get('/latest-image', (req, res) => {
  try {
    // Read the list of files in the 'uploads' folder
    const files = fs.readdirSync('./uploads');

    // Get the latest image (if available)
    const latestImage = files.length > 0 ? files[files.length - 1] : null;

    // Provide the URL of the latest image
    const imageUrl = latestImage ? `/uploads/${latestImage}` : null;

    res.json(imageUrl);
  } catch (error) {
    console.error('Error fetching latest image:', error);
    res.status(500).json(null);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
