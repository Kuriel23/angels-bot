const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("chorar")
    .setNameLocalizations({
      "pt-BR": "chorar",
      "en-US": "cry",
    })
    .setDescription("Não chore, pu favo!"),
  async execute(interaction, client) {
    const { body } = await superagent.get("https://api.waifu.pics/sfw/cry");
    const attachment = new discord.AttachmentBuilder(body.url, {
      name: "cry.gif",
    });
    interaction.reply({
      content: `${interaction.member} está a chorar, consolem ele(a)!`,
      files: [attachment],
    });
  },
};
