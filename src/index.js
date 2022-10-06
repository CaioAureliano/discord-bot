require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const commandsHandler = require('./core/handlers/commands');
const eventsHandler = require('./core/handlers/events');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates] });

client.commands = new Collection();
client.players  = new Map();

commandsHandler(client, __dirname);
eventsHandler(client, __dirname);

client.login(process.env.DISCORD_TOKEN);