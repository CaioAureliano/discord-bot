const { EmbedBuilder } = require("discord.js");

function buildEmbed(song) {
    return new EmbedBuilder()
            .setColor('Random')
            .setTitle(song.title)
            .setURL(song.url)
            .setDescription(`Duration: ${song.duration}`)
            .setThumbnail(song.thumbnail);
}

module.exports = { buildEmbed };