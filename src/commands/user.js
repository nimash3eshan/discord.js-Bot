import { SlashCommandBuilder } from 'discord.js';

const userCommand = new SlashCommandBuilder()
    .setName("adduser")
    .setDescription("get user info")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to get info about")
        .setRequired(true)
    );

export default userCommand.toJSON();