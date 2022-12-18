import { SlashCommandBuilder } from 'discord.js';

const buttonCommand = new SlashCommandBuilder()
    .setName("btn")
    .setDescription("button command")

export default buttonCommand.toJSON(); 