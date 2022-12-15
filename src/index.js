import {Client, GatewayIntentBits, Routes} from 'discord.js';
import {config} from 'dotenv';
import {REST} from '@discordjs/rest'

config();

const client = new Client({
  intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
  ]
}); 

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({version:'10'}).setToken(TOKEN)


client.on('ready', () => {console.log(`Logged in as ${client.user.tag}!`)});
client.on('messageCreate', message => {console.log(message.content)});

async function main() {

  const commands = [
    {
      name: 'nes',
      description: 'you will be great ai developer',
    },
  ];

  try{
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  }
  catch(error) {
    console.error(error)
  }
}

main();


client.login(TOKEN);  