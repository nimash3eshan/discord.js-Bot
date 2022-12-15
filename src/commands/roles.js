import { SlashCommandBuilder } from 'discord.js';

const rolesCommand = new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("add a role")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role you want to add")
        .setRequired(true)
    );

export default rolesCommand.toJSON();