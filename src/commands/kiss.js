const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("beijar")
    .setNameLocalizations({
      "pt-BR": "beijar",
      "en-US": "kiss",
    })
    .setDescription("Eita um beijinho ousado rsrs")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const { body } = await superagent.get("https://api.waifu.pics/sfw/kiss");
    const retribuir = new discord.ButtonBuilder()
      .setCustomId(`beijar ${interaction.user.id} ${member.user.id}`)
      .setStyle(3)
      .setLabel("Retribuir")
      .setEmoji("1055541977082511391");
    const row = new discord.ActionRowBuilder().setComponents(retribuir);
    const attachment = new discord.AttachmentBuilder(body.url, {
      name: "kiss.gif",
    });
    interaction.reply({
      content: `${interaction.member} beijou o(a) ${member.toString()}! Ih são namoradinhos!`,
      files: [attachment],
      components: [row],
    });
  },
};
