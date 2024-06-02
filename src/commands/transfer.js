const discord = require("discord.js");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("transfer")
		.setNameLocalizations({
			"pt-BR": "transferir",
			"en-US": "transfer",
		})
		.setDescription("Transfira dinheiro para outro membro!")
		.addUserOption((option) =>
			option
				.setName("membro")
				.setNameLocalizations({ "pt-BR": "membro", "en-US": "user" })
				.setDescription("Identifique o membro")
				.setRequired(true),
		)
		.addIntegerOption((option) =>
			option
				.setName("dinheiro")
				.setNameLocalizations({ "pt-BR": "dinheiro", "en-US": "money" })
				.setDescription("Identifique o dinheiro a ser transferido")
				.setRequired(true)
				.setMinValue(1),
		),
	async execute(interaction, client) {
		const transferido = interaction.options.getMember("membro");
		const dinheiro2 = interaction.options.getInteger("dinheiro");
		if (transferido.user.bot || transferido.id === interaction.member.id) {
			return interaction.reply({
				embeds: [client.msg.embeds.failedUser],
			});
		}
		const doc = await client.db.Users.findOne({
			_id: interaction.member.id,
		});
		if (!doc) {
			new client.db.Users({ _id: interaction.member.id }).save();
			return interaction.reply({
				embeds: [client.msg.embeds.registro],
			});
		}
		if (doc) {
			if (doc.coins < dinheiro2) {
				return interaction.reply({
					embeds: [client.msg.embeds.noMoney],
				});
			}
			doc.coins -= dinheiro2;
			doc.save();
			client.newTransaction(
				interaction.member.id,
				dinheiro2,
				false,
				`Dinheiro transferido para ${transferido.user.tag}`,
			);
			interaction.reply({
				content: `${transferido.toString()} você ganhou ${dinheiro2} moedas de ${interaction.user.toString()}.`,
			});
			const doc2 = await client.db.Users.findOne({ _id: transferido.id });
			if (doc2) {
				doc2.coins += dinheiro2;
				doc2.save();
			}
			if (!doc2) {
				const docToSave = new client.db.Users({
					_id: transferido.id,
					coins: dinheiro2,
				});
				docToSave.save();
			}
			client.newTransaction(
				transferido.id,
				dinheiro2,
				true,
				`Dinheiro transferido de ${interaction.member.user.tag}`,
			);
		}
	},
};
