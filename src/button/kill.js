const discord = require("discord.js");
const superagent = require("superagent");

module.exports = async (client, interaction) => {
  const ids = interaction.customId.split(" ");
  const retribuidor = ids[2];
  const serhumano = ids[1];

  if (interaction.member.id !== retribuidor) {
    return interaction.reply({
      content: "Sai, sai. Você não foi incluído.",
      ephemeral: true,
    });
  }

  const { body } = await superagent.get("https://api.waifu.pics/sfw/kill");
  const retribuir = new discord.ButtonBuilder()
    .setCustomId(`matar ${retribuidor} ${serhumano}`)
    .setStyle(3)
    .setLabel("Retribuir")
    .setEmoji("1055541977082511391");
  const row = new discord.ActionRowBuilder().setComponents(retribuir);
  const attachment = new discord.AttachmentBuilder(body.url, {
    name: "kill.gif",
  });
  interaction.reply({
    content: `<@${retribuidor}> vingou-se com o(a) <@${serhumano}>!`,
    files: [attachment],
    components: [row],
  });
};
