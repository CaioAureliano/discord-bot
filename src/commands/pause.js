const { SlashCommandBuilder } = require("discord.js");

module.exports = (client) => {
    return {
        data: new SlashCommandBuilder()
            .setName('pause')
            .setDescription('Pause current music'),
        async execute(interaction) {
            const { guildId } = interaction;

            if (!client.players[guildId] || client.players[guildId].player === undefined) {
                return await interaction.reply('Not found song to pause');
            }

            const { player } = client.players[guildId];
            player.pause();

            await interaction.reply('Paused');
        },
    };
};