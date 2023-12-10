const fs = require('fs');
const path = require('path');

const uploadsDir = 'uploads/';

fs.readdir(uploadsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const filteredFiles = files.filter(file => file !== '.' && file !== '..');

  const images = filteredFiles.map(file => ({
    filename: file,
    url: path.join(uploadsDir, file)
  }));

  console.log(JSON.stringify(images, null, 2));
});
