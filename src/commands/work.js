const discord = require("discord.js");
const ms = require("parse-ms-2");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("work")
		.setNameLocalizations({
			"pt-BR": "trabalhar",
			"en-US": "work",
		})
		.setDescription("Trabalhe para ganhar dinheiro."),
	async execute(interaction, client) {
		const doc = await client.db.Users.findOne({
			_id: interaction.member.id,
		});
		if (doc) {
			const delayTime = 28800000;
			if (delayTime - (Date.now() - doc.trabalharCooldown) > 0) {
				const _time = ms(delayTime - (Date.now() - doc.trabalharCooldown));
				const cooldown = new discord.EmbedBuilder()
					.setTitle(
						`Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para coletar o seu salário.`,
					)
					.setColor(client.cor);
				return interaction.reply({ embeds: [cooldown] });
			}
			const salario = Math.floor(Math.random() * (3000 - 1212)) + 1212;
			doc.coins += salario;
			doc.trabalharCooldown = Date.now();
			doc.save();
			interaction.reply({
				content: `Você conseguiu ${salario} moedas do seu salário hoje!`,
			});
			client.newTransaction(doc._id, salario, true, "Salário do trabalho.");
		} else {
			new client.db.Users({ _id: interaction.member.id }).save();
			return interaction.reply({ embeds: [client.msg.embeds.registro] });
		}
	},
};
