const { SlashCommandBuilder } = require("discord.js");
const { play } = require('../core/music/play');

module.exports = (client) => {
    return {
        data: new SlashCommandBuilder()
            .setName('play')
            .setDescription('Play a song from Youtube or Soundcloud')
            .addStringOption(option => 
                option.setName('link')
                    .setDescription('Link from Youtube/Soundcloud')
                    .setRequired(true)),
        async execute(interaction) {
            await play(interaction, client);
        },
    };
};