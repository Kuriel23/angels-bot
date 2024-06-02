const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("bater")
		.setNameLocalizations({
			"pt-BR": "bater",
			"en-US": "punch",
		})
		.setDescription("EITA PORRA OLHA A TRETA BIXO!")
		.addUserOption((option) =>
			option
				.setName("usuário")
				.setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
				.setDescription("Identifique o utilizador")
				.setRequired(true),
		),
	async execute(interaction, client) {
		const member = interaction.options.getMember("usuário");
		const { body } = await superagent.get("https://api.waifu.pics/sfw/bully");
		const retribuir = new discord.ButtonBuilder()
			.setCustomId(`bater ${interaction.user.id} ${member.user.id}`)
			.setStyle(3)
			.setLabel("Retribuir")
			.setEmoji("1055541977082511391");
		const row = new discord.ActionRowBuilder().setComponents(retribuir);
		const attachment = new discord.AttachmentBuilder(body.url, {
			name: "punch.gif",
		});
		interaction.reply({
			content: `${
				interaction.member
			} bateu no(a) ${member.toString()}! Alguém para essa treta por favor!`,
			files: [attachment],
			components: [row],
		});
	},
};
