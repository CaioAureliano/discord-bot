const path = require('node:path');
const fs = require('node:fs');

function getFilesByFolder(folder, basePath) {
    const filesPath = path.join(basePath, folder);
    console.log(filesPath);
    const files = fs.readdirSync(filesPath).filter(file => file.endsWith('.js'));
    return { files, filesPath };
}

module.exports = { getFilesByFolder };