const { SlashCommandBuilder } = require('discord.js');

module.exports = (client) => {
    return {
        data: new SlashCommandBuilder()
            .setName('stop')
            .setDescription('Stop song and leave from channel'),
        async execute(interaction) {
            const { guildId } = interaction;

            if (client.players[guildId] === undefined || client.players[guildId].connection === undefined) {
                return;
            }

            const { connection } = client.players[guildId];
            connection.destroy();
            delete client.players[guildId];
            await interaction.reply('Bye');
        },
    };
};