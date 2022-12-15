import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from 'discord.js';


config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("messageCreate", (message) => {
  console.log(message.content);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    const food = interaction.options.get("food").value;
    const drink = interaction.options.get("drink").value;
    interaction.reply(
      `your ${food} order & ${drink} order is preparing`
    );
  }
});

async function main() { 

  const orderCommand = new SlashCommandBuilder()
    .setName("order")
    .setDescription("order something")
    .addStringOption((option) =>
      option
        .setName("food")
        .setDescription("The type of food you want to order")
        .setRequired(true)
        .setChoices(
          {
            name: "pizza",
            value: "pizza"
          },
          {
            name: "burger",
            value: "burger"
          },
          {
            name: "pasta",
            value: "pasta"
          }
        )

    )
    .addStringOption((option) =>
      option
        .setName("drink")
        .setDescription("The type of drink you want to order")  
        .setRequired(false)
        .setChoices(
          {
            name: "coke",
            value: "coke"
          },
          {
            name: "fanta",
            value: "fanta"
          },
          {
            name: "sprite",
            value: "sprite"
          }
        )

    );

    const commands = [orderCommand.toJSON()];

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

main();

client.login(TOKEN);
