const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Image extensions
const imageExtensions = ["png", "jpg", "jpeg", "gif"];

// Target directory
const dir = 'uploads/';

app.get('/', (req, res) => {
  // Check delete HTTP GET request - remove images
  if (req.query.delete) {
    const imageFilePath = path.join(__dirname, dir, req.query.delete);
    const imageFileType = path.extname(req.query.delete).toLowerCase().substring(1);

    if (fs.existsSync(imageFilePath) && imageExtensions.includes(imageFileType)) {
      console.log("File found and deleted:", req.query.delete);
      fs.unlinkSync(imageFilePath);
      res.send(`File found and deleted: ${req.query.delete}`);
    } else {
      res.send('File not found - <a href="/">refresh</a>');
    }
  } else {
    // Display photo gallery
    fs.readdir(dir, (err, files) => {
      if (err) throw err;

      const imageFiles = files.filter(file => {
        const fileExtension = path.extname(file).toLowerCase().substring(1);
        return file !== '.' && file !== '..' && imageExtensions.includes(fileExtension);
      });

      if (imageFiles.length > 0) {
        res.send(`
          <html>
            <head>
              <title>ESP32-CAM Photo Gallery</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                .flex-container {
                  display: flex;
                  flex-wrap: wrap;
                }
                .flex-container > div {
                  text-align: center;
                  margin: 10px;
                }
              </style>
            </head>
            <body>
              <h2>ESP32-CAM Photo Gallery</h2>
              <div class="flex-container">
                ${imageFiles.map(file => `
                  <div>
                    <p><a href="?delete=${encodeURIComponent(file)}">Delete file</a> - ${file}</p>
                    <a href="${path.join(dir, file)}">
                      <img src="${path.join(dir, file)}" style="width: 350px;" alt="" title=""/>
                    </a>
                  </div>`).join('')}
              </div>
            </body>
          </html>
        `);
      } else {
        res.send("<p>No images found</p>");
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
