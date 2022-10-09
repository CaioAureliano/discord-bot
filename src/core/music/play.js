const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const playdl = require('play-dl');

async function play(interaction, client) {

    await interaction.reply('Searching song...');
    
    const channel = interaction.member.voice.channel;
    if (!channel) {
        return await interaction.editReply('Join a voice channel');
    }
    
    const { guildId } = interaction;
    
    const url = interaction.options.getString('link');
    const info = await playdl.search(url);

    try {
        if (client.players[guildId] !== undefined) {
            addSongToQueue(client, guildId, info);
            await interaction.editReply(`Added song **${info[0].title}** to queue`);
        } else {
            const { player, connection } = await createPlayer(channel);

            const resource = await getSongResource(url);

            client.players[guildId] = {
                player,
                connection,
                queue: [],
            };

            addSongToQueue(client, guildId, info);

            await playSong(player, resource, interaction, info);
            client.players[guildId].player.on(AudioPlayerStatus.Idle, async () => await playNextSong(client, guildId, interaction, info));
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply('Ops... not possible play this song :(');
    }
}

async function createPlayer(channel) {
    const player = createAudioPlayer();
    const connection = connectToChannel(channel);

    connection.subscribe(player);

    return { player, connection };
}

function connectToChannel(channel) {
    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
}

async function getSongResource(url) {
    const stream = await playdl.stream(url);
    return createAudioResource(stream.stream, { inputType: stream.type });
}

function addSongToQueue(client, guildId, info) {
    client.players[guildId].queue.push({
        title: info[0].title,
        url: info[0].url,
        thumbnail: info[0].thumbnails[0].url ?? '',
        duration: info[0].durationRaw,
    });
}

async function playNextSong(client, guildId, interaction, info) {
    if (client.players[guildId] !== undefined) {
        client.players[guildId].queue.shift();
        
        const { player, queue } = client.players[guildId];
        if (queue.length === 0) {
            delete client.players[guildId];
            return;
        }

        const nextSong = await getSongResource(queue[0].url);
        await playSong(player, nextSong, interaction, info);
    }
}

async function playSong(player, resource, interaction, info) {
    player.play(resource);
    await interaction.editReply(`Playing: **${info[0].title}**`);
}

module.exports = { play };