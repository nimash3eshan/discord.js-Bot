import {
  Client,
  GatewayIntentBits,
  ModalBuilder,
  Routes,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

import { config } from "dotenv";
import { REST } from "@discordjs/rest";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


import orderCommand from "./commands/order.js";
import rolesCommand from "./commands/roles.js";
import userCommand from "./commands/user.js";
import channelCommand from "./commands/channel.js";
import banCommand from "./commands/ban.js";
import selOrderCommand from "./commands/selOrder.js";
import registerCommand from "./commands/register.js";
import buttonCommand from "./commands/button.js";
import memeCommand from "./commands/meme.js";

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
  // client.channels.cache.get("1040982597506977792").send(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "hello") {
    message.reply("hello");
  }
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
      await interaction.reply(
        `your ${food} order & ${drink} order is preparing`
      );
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
      const row1 = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("se1")
          .setPlaceholder("select your favourite food")
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
      const row2 = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("se2")
          .setPlaceholder("select your favourite drink")
          .addOptions([
            {
              label: "Coke",
              description: "Coke is delicious",
              value: "coke",
              emoji: "🥤",
            },
            {
              label: "Tea",
              description: "Tea is delicious",
              value: "tea",
              emoji: "🍵",
            },
            {
              label: "Coffee",
              description: "Coffee is delicious",
              value: "coffee",
              emoji: "☕",
            },
          ])
      );

      await interaction.reply({
        content: "Select your favorite food",
        components: [row1, row2],
      });
    }

    if (interaction.commandName === "register") {
      const modal = new ModalBuilder()
        .setTitle("Register")
        .setCustomId("reg")
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("name")
              .setLabel("Name")
              .setStyle(TextInputStyle.Short)
              .setPlaceholder("Enter your name")
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("email")
              .setLabel("Email")
              .setStyle(TextInputStyle.Short)
              .setPlaceholder("Enter your email")
          )
        );

      await interaction.showModal(modal);
    }

    if (interaction.commandName === "btn") {
      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("btn1")
          .setLabel("Click me success")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("btn2")
          .setLabel("Click me primary")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("btn3")
          .setLabel("Click me danger")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("btn4")
          .setLabel("Click me secondary")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setLabel("Click me link")
          .setStyle(ButtonStyle.Link)
          .setURL("https://youtu.be/xvFZjo5PgG0")
      );

      await interaction.reply({
        content: "Click the button",
        components: [button],
      });
    }

    if (interaction.commandName === "meme") {
      const choice = interaction.options.get("type").value;

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("btnm1")
          .setLabel("⏭ Next Meme")
          .setStyle(ButtonStyle.Success)
      );

      if (choice === "m1") {
        const embed = new EmbedBuilder();
        try{
          fetch("https://www.reddit.com/r/memes.json?sort=hot").then(async res => {
            let memes = await res.json();
            let random_post = memes["data"]["children"][Math.floor(Math.random() * 100) + 1];

            if(random_post) {
              let memeImage = random_post["data"]["url"];
              let memeTitle = random_post["data"]["title"];
              // let permalink = random_post["data"]["permalink"];
              let memeUrl = `https://erary.com`;
              let memeUpvotes = random_post["data"]["ups"];
              let memeNumComments = random_post["data"]["num_comments"];

              embed.setTitle(`${memeTitle}`);
              embed.setURL(`${memeUrl}`); 
              embed.setColor("Random");
              embed.setImage(memeImage);
              embed.setFooter({
                text: `👍 ${memeUpvotes} 💬 ${memeNumComments}  |  Powered by NES Siripala \n meme requested by ${interaction.member.user.tag}`
              });

              await interaction.reply({
                embeds: [embed],
                components: [row],
              })
            }
          else {
            await interaction.reply({
              content: "No memes found. Please retype the command",
              ephemeral: true
            })
          }
          })
        }
        catch(err){
          console.log(err);
          await interaction.reply({ 
            content: "No memes found. Please retype the command",
            ephemeral: true
          })
        }  
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "se1") {
      await interaction.reply(
        `you selected ${interaction.values[0]} for your food`
      );
    } else if (interaction.customId === "se2") {
      await interaction.reply(
        `you selected ${interaction.values[0]} for your drink`
      );
    }
  } else if (interaction.customId === "reg") {
    const name = interaction.fields.getTextInputValue("name");
    const email = interaction.fields.getTextInputValue("email");
    await interaction.reply({
      content: `your name is ${name} and email is ${email}`,
      ephemeral: true,
    });
  } else if (interaction.isButton()) {
    if (interaction.customId === "btn1") {
      await interaction.reply({
        content: "success button clicked",
        ephemeral: true,
      });
    } else if (interaction.customId === "btn2") {
      await interaction.reply({
        content: "primary button clicked",
        ephemeral: true,
      });
    } else if (interaction.customId === "btn3") {
      await interaction.reply({
        content: "danger button clicked",
        ephemeral: true,
      });
    } else if (interaction.customId === "btn4") {
      await interaction.reply({
        content: "secondary button clicked",
        ephemeral: true,
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
    registerCommand,
    buttonCommand,
    memeCommand,
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
