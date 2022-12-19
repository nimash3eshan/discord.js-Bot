import { SlashCommandBuilder} from 'discord.js';

const memeCommand = new SlashCommandBuilder()
    .setName("meme")
    .setDescription("get a random meme")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type of food you want to order")
        .setRequired(true)
        .setChoices(
          {
            name: "Sinhala Memes",
            value: "m1"
          },
          {
            name: "English Memes",
            value: "m2"
          },
          {
            name: "Anime Memes",
            value: "m3"
          },
          {
            name: "programming Memes",
            value: "m4"
          },
          {
            name: "Gaming Memes >>> pubg",
            value: "m5"
          },
          {
            name: "Gaming Memes >>> Valorant",
            value: "m6"
          },
          {
            name: "Gaming Memes >>> Fortnite",
            value: "m7"
          },
          {
            name: "Gaming Memes >>> Minecraft", 
            value: "m8"
          },
          {
            name: "Gaming Memes >>> Roblox",
            value: "m9"
          },
          {
            name: "Gaming Memes >>> GTA",
            value: "m10"
          },
          {
            name: "Gaming Memes >>> COD",
            value: "m11"
          },
        )

    )
    
export default memeCommand.toJSON(); 