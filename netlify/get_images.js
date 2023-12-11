// netlify/get_images.js

const fs = require('fs');
const path = require('path');

const uploadsDir = 'Projectwebserver/uploads/';

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        reject({
          statusCode: 500,
          body: 'Internal Server Error',
        });
        return;
      }

      const filteredFiles = files.filter(file => file !== '.' && file !== '..');

      const images = filteredFiles.map(file => ({
        filename: file,
        url: path.join(uploadsDir, file),
      }));

      resolve({
        statusCode: 200,
        body: JSON.stringify(images, null, 2),
      });
    });
  });
};
