import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";

import orderCommand from "./commands/order.js";
import rolesCommand from "./commands/roles.js";
import userCommand from "./commands/user.js";
import channelCommand from "./commands/channel.js";
import banCommand from "./commands/ban.js";
import selOrderCommand from "./commands/selOrder.js";

import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

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

client.on("interactionCreate", async (interaction) => {
  // if (interaction.isChatInputCommand()) {
  //   const food = interaction.options.get("food").value;
  //   const drink = interaction.options.get("drink").value;
  //   interaction.reply(
  //     `your ${food} order & ${drink} order is preparing`
  //   );
  // }
  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === "order") {
      const food = interaction.options.get("food").value;
      const drink = interaction.options.get("drink").value;
      await interaction.reply(`your ${food} order & ${drink} order is preparing`);
    }

    if (interaction.commandName === "addrole") {
      const role = interaction.options.get("role").value;
      await interaction.reply(`your role is ${role}`);
    }

    if (interaction.commandName === "adduser") {
      const user = interaction.options.get("user").value;
      await interaction.reply(`your user is ${user}`);
    }

    if (interaction.commandName === "addchannel") {
      const channel = interaction.options.get("channel").value;
      await interaction.reply(`your channel is ${channel}`);
    }

    if (interaction.commandName === "ban") {
      const user = interaction.options.get("user").value;
      await interaction.reply(`you banned the ${user}`);
    }

    if (interaction.commandName === "select") {
      // console.log(interaction);
      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("select")
          .setPlaceholder("Nothing selected")
          .addOptions([
            {
              label: "Pizza",
              description: "Pizza is delicious",
              value: "pizza",
              emoji: "🍕",
            },
            {
              label: "Burger",
              description: "Burger is delicious",
              value: "burger",
              emoji: "🍔",
            },
            {
              label: "Pasta",
              description: "Pasta is delicious",
              value: "pasta",
              emoji: "🍝",
            },
          ])
      );

      await interaction.reply({
        content: "Select your favorite food",
        components: [row],
      });
    }
  }
});

async function main() {
  const commands = [
    orderCommand,
    rolesCommand,
    userCommand,
    channelCommand,
    banCommand,
    selOrderCommand,
  ];

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
