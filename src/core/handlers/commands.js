const path = require('node:path');
const { getFilesByFolder } = require('../utils/files');

module.exports = (client, basePath) => {
    const { files: commandFiles, filesPath: commandsPath } = getFilesByFolder('commands', basePath);

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command  = require(filePath);

        client.commands.set(command.data.name, command);
    }
}