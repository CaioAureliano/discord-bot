const { EmbedBuilder } = require("discord.js");

async function queue(interaction, client) {
    const { guildId, channel } = interaction;

    if (client.players[guildId] === undefined || !client.players[guildId].queue.length) {
        return await interaction.reply('Not found songs');
    }

    const { queue } = client.players[guildId];
    queue.shift();
    const songs = queue.slice(0, 9);
    const embedSongs = songs.map(buildEmbed);

    channel.send({ embeds: embedSongs });
    await interaction.reply(`List with next ${songs.length} songs in queue`);
}

function buildEmbed(song) {
    return new EmbedBuilder()
            .setColor('Random')
            .setTitle(song.title)
            .setURL(song.url)
            .setDescription(`Duration: ${song.duration}`)
            .setThumbnail(song.thumbnail);
}

module.exports = { queue };