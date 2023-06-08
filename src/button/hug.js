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

  const user = await interaction.guild.members.fetch(serhumano);
  const { body } = await superagent.get("https://api.waifu.pics/sfw/hug");
  const retribuir = new discord.ButtonBuilder()
    .setCustomId(`abraçar ${retribuidor} ${serhumano}`)
    .setStyle(3)
    .setLabel("Retribuir")
    .setEmoji("1055541977082511391");
  const row = new discord.ActionRowBuilder().setComponents(retribuir);
  const embed = new discord.EmbedBuilder()
    .setAuthor({
      name: `» ${interaction.user.username} retribuiu o abraço com o(a) ${user.user.username}`,
      iconURL: "https://i.imgur.com/3pCDf7k.png",
    })
    .setImage(body.url)
    .setColor(client.cor)
    .setTimestamp();
  interaction.reply({
    content: `<@${serhumano}>,`,
    embeds: [embed],
    components: [row],
  });
};
