const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("tapa")
    .setNameLocalizations({
      "pt-BR": "tapa",
      "en-US": "slap",
    })
    .setDescription("Dê o tapa em quem merece!!!")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const { body } = await superagent.get("https://api.waifu.pics/sfw/slap");
    const retribuir = new discord.ButtonBuilder()
      .setCustomId(`tapa ${interaction.user.id} ${member.user.id}`)
      .setStyle(3)
      .setLabel("Retribuir")
      .setEmoji("1055541977082511391");
    const row = new discord.ActionRowBuilder().setComponents(retribuir);
    const attachment = new discord.AttachmentBuilder(body.url, {
      name: "tapa.gif",
    });
    interaction.reply({
      content: `${interaction.member} deu um tapa em ${member.toString()}`,
      files: [attachment],
      components: [row],
    });
  },
};
