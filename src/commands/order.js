import { SlashCommandBuilder } from 'discord.js';

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


export default orderCommand.toJSON();