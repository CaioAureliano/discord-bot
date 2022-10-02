const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const playdl = require('play-dl');

async function play(interaction) {
    await interaction.reply('Trying found and play song...');

    const channel = interaction.member.voice.channel;
    if (channel) {
        try {
            const connection = connectToChannel(channel);

            const stream = await getStreamAudioResourceByLink(interaction);            
            const resource = createAudioResource(stream.stream, { inputType: stream.type });
            
            const player = createAudioPlayer();
            player.play(resource);

            connection.subscribe(player);
            
            await interaction.editReply('Playing: ');

        } catch (error) {
            console.error(error);
            await interaction.reply('cannot play this song :(');
        }
    } else {
        await interaction.reply('Join a voice channel');
    }
}

function connectToChannel(channel) {
    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
}

async function getStreamAudioResourceByLink(interaction) {
    const url = interaction.options.getString('link');
    return await playdl.stream(url);
}

module.exports = { play };