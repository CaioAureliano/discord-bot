const { SlashCommandBuilder } = require('discord.js');
const { queue } = require('../core/music/queue');

module.exports = (client) => {
    return {
        data: new SlashCommandBuilder()
            .setName('queue')
            .setDescription('Show the queue list'),
        async execute(interaction) {
            await queue(interaction, client);
        },
    };
};