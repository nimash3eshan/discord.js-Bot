import { SlashCommandBuilder } from 'discord.js';

const channelCommand = new SlashCommandBuilder()
    .setName("addchannel")
    .setDescription("get channel info")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to get info about")
        .setRequired(true)
    );

export default channelCommand.toJSON(); 