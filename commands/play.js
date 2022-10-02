const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const play = require('play-dl');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song'),
    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        if (channel) {
            try {
                
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });

                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Play,
                    },
                });

                const stream = await play.stream('');
                const resource = createAudioResource(stream.stream, { inputType: stream.type });

                player.play(resource);
                
                connection.subscribe(player);

                player.on('error', console.error);
                
                interaction.reply('playing...');
            } catch (error) {
                console.error(error);
                await interaction.reply('cannot play this song :(');
            }
        } else {
            await interaction.reply('Join a voice channel');
        }
    },
};