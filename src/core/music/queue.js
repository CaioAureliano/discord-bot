const { EmbedBuilder } = require("discord.js");
const { buildEmbed } = require('../utils/embed');

async function queue(interaction, client) {
    const { guildId, channel } = interaction;

    if (client.players[guildId] === undefined || client.players[guildId].queue.length <= 1) {
        return await interaction.reply('Not found songs');
    }

    const { queue } = client.players[guildId];
    queue.shift();
    const songs = queue.slice(0, 9);
    const embedSongs = songs.map(buildEmbed);

    channel.send({ embeds: embedSongs });
    await interaction.reply(`List with next ${songs.length} songs in queue`);
}

module.exports = { queue };