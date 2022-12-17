import { SlashCommandBuilder } from "discord.js";

const banCommand = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("ban a user")
  // .addSubcommand((subcommand) =>
  //   subcommand
  //     .setName("temp")
  //     .setDescription("temporary ban a user")
  //     .addUserOption((option) =>
  //       option
  //         .setName("user")
  //         .setDescription("The user you want to ban")
  //         .setRequired(true)
  //     )
  // )
  // .addSubcommand((subcommand) =>
  //   subcommand
  //     .setName("perm")
  //     .setDescription("permanently ban a user")
  //     .addUserOption((option) =>
  //       option
  //         .setName("user")
  //         .setDescription("The user you want to ban")
  //         .setRequired(true)
  //     )
  // );
  .addSubcommandGroup((group) =>
    group
      .setName("temp")
      .setDescription("temporary ban a user")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("user")
          .setDescription("The user you want to ban")
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user you want to ban")
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("perm")
          .setDescription("permanently ban a user")
          .addUserOption((option) =>
            option
              .setName("user")
              .setDescription("The user you want to ban")
              .setRequired(true) 
          )
      )
  );


export default banCommand.toJSON();
