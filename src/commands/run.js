const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("correr")
    .setNameLocalizations({
      "pt-BR": "correr",
      "en-US": "run",
    })
    .setDescription("Bora para a maratona!"),
  async execute(interaction, client) {
    const { body } = await superagent.get(
      "https://api.otakugifs.xyz/gif?reaction=run"
    );
    const attachment = new discord.AttachmentBuilder(body.url, {
      name: "run.gif",
    });
    interaction.reply({
      content: `${interaction.member} começa a sua maratona!`,
      files: [attachment],
    });
  },
};
