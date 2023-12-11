// netlify/upload.js

const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: 'Invalid request method.',
    };
  }

  const fileFieldName = 'file';
  const targetDir = 'uploads/';
  const targetFile = targetDir + JSON.parse(event.body)[fileFieldName].name;

  const fileBuffer = Buffer.from(JSON.parse(event.body)[fileFieldName].data, 'base64');

  // Handle photo upload
  try {
    require('fs').writeFileSync(targetFile, fileBuffer);
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error uploading photo.',
    };
  }

  // Get GPS data
  const latitude = event.headers.latitude || 'N/A';
  const longitude = event.headers.longitude || 'N/A';

  // Save GPS data to a database or perform other actions as needed
  // ...

  // Display map with location
  const mapIframe = `<iframe width="600" height="450" frameborder="0" style="border:0" src="https://maps.google.com?q=${latitude},${longitude}&output=embed"></iframe>`;
  console.log(mapIframe);

  return {
    statusCode: 200,
    body: `Photo uploaded successfully.\nLatitude: ${latitude}\nLongitude: ${longitude}`,
  };
};
