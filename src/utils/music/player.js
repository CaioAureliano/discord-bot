const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const playdl = require('play-dl');

const players = new Map();

async function play(interaction) {

    await interaction.reply('Searching song...');
    
    const { guildId } = interaction;

    const channel = interaction.member.voice.channel;
    if (channel) {
        try {

            const url = interaction.options.getString('link');
            const info = await playdl.search(url);

            let currentPlayer;
            if (players.has(guildId)) {

                currentPlayer = players.get(guildId);

                currentPlayer.queue.push({
                    title: info[0].title,
                    url:   info[0].url,
                });

            } else {
                const player = createAudioPlayer();
                const connection = connectToChannel(channel);

                connection.subscribe(player);

                const stream = await playdl.stream(url);
                const resource = createAudioResource(stream.stream, { inputType: stream.type });

                player.play(resource);

                player.on(AudioPlayerStatus.Idle, async () => {
                    console.log('idle...');
                    if (players.has(guildId)) {
                        const p = players.get(guildId);

                        p.queue.shift();
                        if (p.queue.length > 0) {
                            const stream = await playdl.stream(p.queue[0].url);
                            const resource = createAudioResource(stream.stream, { inputType: stream.type });

                            player.play(resource);
                        } else {
                            players.delete(guildId);
                        }
                    }
                });
                
                const newPlayer = {
                    player,
                    connection,
                    queue: [],
                };
                
                newPlayer.queue.push({
                    title: info[0].title,
                    url:   info[0].url,
                });               
                
                players.set(guildId, newPlayer);

                await interaction.editReply(`Playing: **${info[0].title}**`);
                
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply('cannot play this song :(');
        }
    } else {
        await interaction.editReply('Join a voice channel');
    }
}

function connectToChannel(channel) {
    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
}

module.exports = { play };