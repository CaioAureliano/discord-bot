const path = require('node:path');
const { getFilesByFolder } = require('../utils/files');

module.exports = (client, basePath) => {
    const { files: eventFiles, filesPath: eventsPath } = getFilesByFolder('events', basePath);

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event    = require(filePath)(client);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}