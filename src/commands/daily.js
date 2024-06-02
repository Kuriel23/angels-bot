const discord = require("discord.js");
const ms = require("parse-ms-2");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("daily")
		.setNameLocalizations({
			"pt-BR": "diário",
			"en-US": "daily",
		})
		.setDescription("Resgate umas moedas diárias."),
	async execute(interaction, client) {
		const doc = await client.db.Users.findOne({
			_id: interaction.member.id,
		});
		const money = Math.floor(Math.random() * (10000 - 1212)) + 1;
		if (doc) {
			const delayTime = 43200000;
			if (delayTime - (Date.now() - doc.dailyCooldown) > 0) {
				const _time = ms(delayTime - (Date.now() - doc.dailyCooldown));
				const emb = new discord.EmbedBuilder()
					.setTitle(
						`Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para coletar a sua bufunfa diária.`,
					)
					.setColor(client.cor);
				return interaction.reply({ embeds: [emb] });
			}
			doc.coins += money;
			doc.dailyCooldown = Date.now();
			doc.save();
			client.newTransaction(
				interaction.member.id,
				money,
				true,
				"Executou daily",
			);
		} else {
			new client.db.Users({
				_id: interaction.member.id,
				dailyCooldown: Date.now(),
				coins: money,
			}).save();
		}
		return interaction.reply({
			content: `Você resgatou ${money} moedas hoje.`,
		});
	},
};
