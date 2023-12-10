const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.post('/', (req, res) => {
  // Handle photo upload
  const fileFieldName = 'file';
  const targetDir = 'uploads/';
  const targetFile = targetDir + req.files[fileFieldName].name;

  req.files[fileFieldName].mv(targetFile, (err) => {
    if (err) {
      return res.status(500).send('Error uploading photo.');
    }

    // Get GPS data
    const latitude = req.get('latitude') || 'N/A';
    const longitude = req.get('longitude') || 'N/A';

    res.send(`Photo uploaded successfully.<br>Latitude: ${latitude}<br>Longitude: ${longitude}`);

    // Save GPS data to a database or perform other actions as needed
    // ...

    // Display map with location
    const mapIframe = `<iframe width="600" height="450" frameborder="0" style="border:0" src="https://maps.google.com?q=${latitude},${longitude}&output=embed"></iframe>`;
    console.log(mapIframe);
  });
});

app.use((req, res) => {
  res.status(400).send('Invalid request.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
