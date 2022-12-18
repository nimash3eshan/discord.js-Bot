import { SlashCommandBuilder } from 'discord.js';

const registerCommand = new SlashCommandBuilder()
    .setName("register")
    .setDescription("regsiter a user to the server")
    

export default registerCommand.toJSON(); 