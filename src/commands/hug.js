const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("abraçar")
		.setNameLocalizations({
			"pt-BR": "abraçar",
			"en-US": "hug",
		})
		.setDescription("Quer dar um abracinho ao seu amigo?")
		.addUserOption((option) =>
			option
				.setName("usuário")
				.setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
				.setDescription("Identifique o utilizador")
				.setRequired(true),
		),
	async execute(interaction, client) {
		const user = interaction.options.getMember("usuário");
		const { body } = await superagent.get("https://api.waifu.pics/sfw/hug");
		const retribuir = new discord.ButtonBuilder()
			.setCustomId(`abraçar ${interaction.user.id} ${user.user.id}`)
			.setStyle(3)
			.setLabel("Retribuir")
			.setEmoji("1055541977082511391");
		const row = new discord.ActionRowBuilder().setComponents(retribuir);
		const embed = new discord.EmbedBuilder()
			.setAuthor({
				name: `» ${interaction.user.username} deu um abraço no(a) ${user.user.username}`,
				iconURL: "https://i.imgur.com/3pCDf7k.png",
			})
			.setImage(body.url)
			.setColor(client.cor)
			.setTimestamp();
		interaction.reply({
			content: `${user.toString()},`,
			embeds: [embed],
			components: [row],
		});
	},
};
