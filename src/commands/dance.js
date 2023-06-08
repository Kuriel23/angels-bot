const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("dançar")
    .setNameLocalizations({
      "pt-BR": "dançar",
      "en-US": "dance",
    })
    .setDescription("Let's Dance Baby!"),
  async execute(interaction, client) {
    const { body } = await superagent.get("https://api.waifu.pics/sfw/dance");
    const attachment = new discord.AttachmentBuilder(body.url, {
      name: "dance.gif",
    });
    interaction.reply({
      content: `${interaction.member} dançou, e muito bem!`,
      files: [attachment],
    });
  },
};
