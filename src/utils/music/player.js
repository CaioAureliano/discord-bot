const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const playdl = require('play-dl');

const players = new Map();

async function play(interaction) {

    let currentPlayer;
    const { guildId } = interaction;

    await interaction.reply('Searching song...');
    
    const channel = interaction.member.voice.channel;
    if (channel) {
        
        if (players.has(guildId)) {
            currentPlayer = players.get(guildId);
        } else {
            currentPlayer = {
                player: createAudioPlayer(),
                queue: {
                    tracks: [],
                },
            };

            players.set(guildId, currentPlayer);
        }
        
        const { player, queue } = currentPlayer;

        try {
            const connection = connectToChannel(channel);

            const url = interaction.options.getString('link');
            const info = await playdl.search(url);

            queue.tracks.push({
                title: info[0].title,
                url:   info[0].url,
            });

            if (!queue.current) {
                queue.current = queue.tracks[0];

                const stream = await playdl.stream(url);
                const resource = createAudioResource(stream.stream, { inputType: stream.type });
    
                player.play(resource);
    
                connection.subscribe(player);
    
                await interaction.editReply(`Playing: **${info[0].title}**`);

                player.on(AudioPlayerStatus.Idle, async () => {
                });
                
            } else {
                await interaction.editReply(`Added song **${info[0].title}** to queue`);
            }

            players.set(guildId, { 
                player,
                queue,
            });

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