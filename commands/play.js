const { SlashCommandBuilder } = require("discord.js");
const { generateDependencyReport } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song'),
    async execute(interaction) {
        console.log(generateDependencyReport());
        await interaction.reply('playing...');
    },
};