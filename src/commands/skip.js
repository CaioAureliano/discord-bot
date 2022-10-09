const { SlashCommandBuilder } = require("discord.js");
const { playNextSong } = require('../core/music/play');

module.exports = (client) => {
    return {
        data: new SlashCommandBuilder()
            .setName('skip')
            .setDescription('Skip current song'),
        async execute(interaction) {
            const { guildId } = interaction;
            
            if (!client.players[guildId] || !client.players[guildId].queue) {
                return await interaction.reply('Not found song(s)');
            }

            await interaction.reply('Skipped!');

            await playNextSong(client, guildId, interaction, [client.players[guildId].queue[0]]);
        },
    };
};