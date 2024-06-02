const discord = require("discord.js");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("atm")
		.setNameLocalizations({
			"pt-BR": "banco",
			"en-US": "atm",
		})
		.setDescription("Veja a sua carteira!")
		.addUserOption((option) =>
			option
				.setName("usuário")
				.setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
				.setDescription("Identifique o utilizador")
				.setRequired(false),
		),
	async execute(interaction, client) {
		const membro =
			interaction.options.getMember("usuário") || interaction.member;
		const ec = await client.db.Users.findOne({ _id: membro.id });
		if (!ec) {
			await new client.db.Users({ _id: membro.id }).save();
			return interaction.reply({ embeds: [client.msg.embeds.registro] });
		}
		interaction.reply({
			content: `${membro.user.username} apenas têm ${ec.coins} moedas.`,
		});
	},
};
