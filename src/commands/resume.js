const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { buildEmbed } = require('../core/utils/embed');

module.exports = (client) => {
    return {
        data: new SlashCommandBuilder()
            .setName('resume')
            .setDescription('Unpaused song'),
        async execute(interaction) {
            const { guildId } = interaction;

            if (!client.players[guildId] || client.players[guildId].player === undefined) {
                return await interaction.reply('');
            }

            const { player, queue } = client.players[guildId];
            player.unpause();

            const embedResume = buildEmbed(queue[0]);

            await interaction.reply({ content: 'Resume', embeds: [embedResume]});
        },
    };
};