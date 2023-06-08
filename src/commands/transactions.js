const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("transactions")
    .setNameLocalizations({
      "pt-BR": "transações",
      "en-US": "transactions",
    })
    .setDescription("Veja suas transações.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getMember("usuário") || interaction.member;
    const doc = await client.db.Users.findOne({ _id: user.id });
    if (doc) {
      await interaction.reply({ content: "Carregando..." });
      let page;
      let buttonname;
      let collector;
      await Search(1);
      async function Search(pagina) {
        const startIndex = (pagina - 1) * 5;
        const endIndex = startIndex + 5;

        const transactions = doc.transactions
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(startIndex, endIndex);

        page = pagina;

        const hasLeftPage = pagina >= 2;
        const hasNextPage = transactions.length < 5;
        const str2 = Math.floor(Math.random() * 100);
        buttonname = str2;
        const antes = new discord.ButtonBuilder()
          .setCustomId(str2 + "prev")
          .setEmoji("1065370746303553587")
          .setStyle(2)
          .setDisabled(!hasLeftPage);
        const depois = new discord.ButtonBuilder()
          .setCustomId(str2 + "next")
          .setEmoji("1065370743526916096")
          .setStyle(2)
          .setDisabled(hasNextPage);
        const botao = new discord.ActionRowBuilder()
          .addComponents(antes)
          .addComponents(depois);
        const waifus = new discord.EmbedBuilder()
          .setTitle("SUAS ÚLTIMAS 5 TRANSAÇÕES")
          .setFooter({
            text: `Página ${pagina}`,
          })
          .setThumbnail("https://i.imgur.com/XhOQjhu.png")
          .setColor(client.cor);
        const fields = transactions.map((w) => ({
          name: `${w.reason}`,
          value: `┣ ${
            w.received ? "💰" : "💸"
          } **Dinheiro**: ${w.money.toLocaleString(
            "pt-BR"
          )}\n┗ 🕐 **Data**: ${w.time.toLocaleString("en-GB", {
            timeZone: "America/Sao_Paulo",
            hour12: false,
          })}`,
          inline: false,
        }));

        waifus.addFields(...fields);
        const mensagem = await interaction.editReply({
          content: null,
          embeds: [waifus],
          components: [botao],
        });
        const filter = (i) =>
          i.customId === buttonname + "next" ||
          (i.customId === buttonname + "prev" &&
            interaction.user.id === i.user.id);
        collector = mensagem.createMessageComponentCollector({
          filter,
          time: 300000,
          max: 1,
        });
        collector.on("collect", (i) => {
          if (i.customId === buttonname + "next") {
            i.deferUpdate();
            Search(page + 1);
          }
          if (i.customId === buttonname + "prev") {
            i.deferUpdate();
            Search(page - 1);
          }
        });
      }
    } else {
      new client.db.Users({ _id: user.id }).save();
      return interaction.reply({ embeds: [client.msg.embeds.registro] });
    }
  },
};
