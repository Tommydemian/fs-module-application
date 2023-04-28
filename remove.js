const fs = require('fs');

function removeFile(path) {
  fs.unlink(path, (error) => {
    if (error) return console.error(error); 
  })
}

removeFile('worklikehell.txt')