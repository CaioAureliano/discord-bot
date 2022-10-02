const { SlashCommandBuilder } = require("discord.js");
const { play } = require('../utils/music/player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from Youtube or Soundcloud')
        .addStringOption(option => 
            option.setName('link')
                .setDescription('Link from Youtube/Soundcloud')
                .setRequired(true)),
    async execute(interaction) {
        await play(interaction);
    },
};