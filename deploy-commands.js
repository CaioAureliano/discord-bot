require('dotenv').config();
const { REST, SlashCommandBuilder, Routes } = require('discord.js');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), { body: commands})
    .then(data => console.log('ok: ', data))
    .catch(console.error);