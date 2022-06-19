import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, TextChannel } from "discord.js";
import { createTicket } from "../firebase";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Creates a new help ticket")
  .addStringOption((option) =>
    option
      .setName("description")
      .setDescription("Describe your problem")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction, client: Client) {
  if (!interaction?.channelId) {
    return;
  }
  const channel = await client.channels.fetch(interaction.channelId);
  if (!channel || channel.type !== "GUILD_TEXT") {
    return;
  }
  const thread = await (channel as TextChannel).threads.create({
    name: `support-${Date.now()}`,
    reason: `Support ticket ${Date.now()}`,
  });
  const problemDescriptor = interaction.options.getString("description")!;
  const { user } = interaction;
  thread.send(`**User:** <@${user}> **Problem:** ${problemDescriptor}`);

  await createTicket(thread.id, problemDescriptor);

  /**
   * TODO: Create ticket and store in firestore.
   * * Ephemeral specifies that only the user who ran the command will be able to see the message.
   */

  return interaction.reply({ content: "Help is on the way!", ephemeral: true });
}
