const discord = require("discord.js");
const ms = require("parse-ms-2");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("crime")
		.setDescription("Cometa crimes e ganhe moedas"),
	async execute(interaction, client) {
		const doc = await client.db.Users.findOne({
			_id: interaction.member.id,
		});

		if (doc) {
			const respostas = [
				"Droga",
				"Assassino",
				"Violação",
				"Sequestro",
				"Estupro",
				"Manipulação",
				"Hackear",
				"Prisão",
			];
			const resultadoAleatorio = Math.floor(Math.random() * respostas.length);
			const result =
				respostas[
					respostas.length === 1
						? 0
						: resultadoAleatorio === 0
							? resultadoAleatorio + 1
							: resultadoAleatorio - 1
				];
			const delayTime = 21600000;
			if (delayTime - (Date.now() - doc.crimeCooldown) > 0) {
				const _time = ms(delayTime - (Date.now() - doc.crimeCooldown));
				const cooldown = new discord.EmbedBuilder()
					.setAuthor({
						name: `Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para fazer roubos.`,
						iconURL: client.err,
					})
					.setColor(client.cor);
				return interaction.reply({ embeds: [cooldown] });
			}
			function embed(title) {
				const emb = new discord.EmbedBuilder()
					.setTitle(title)
					.setColor(client.cor);
				return emb;
			}
			if (delayTime - (Date.now() - doc.crimeCooldown) < 0) {
				if (result === "Prisão") {
					const prisao = embed("Você foi preso.");
					interaction.reply({ embeds: [prisao] });
				}
				if (result === "Droga") {
					const droga = Math.floor(Math.random() * (50000 - 30000)) + 30000;
					doc.coins += droga;
					const drogaemb = embed(
						`Você vendeu 5kg de her*ína, lucro de ${droga} moedas.`,
					);
					client.newTransaction(
						interaction.member.id,
						droga,
						true,
						"Executou crime",
					);
					interaction.reply({ embeds: [drogaemb] });
				}
				if (result === "Assassino") {
					const ass = Math.floor(Math.random() * (5000 - 2000)) + 2000;
					doc.coins += ass;
					const assassino = embed(
						`Você mat*u um famoso, lucrou ${ass} moedas.`,
					);
					client.newTransaction(
						interaction.member.id,
						ass,
						true,
						"Executou crime",
					);
					interaction.reply({ embeds: [assassino] });
				}
				if (result === "Violação") {
					const violar = Math.floor(Math.random() * (5000 - 3000)) + 3000;
					doc.coins += violar;
					const violou = embed(
						`Turturou uma gangue, recebeu ${violar} moedas.`,
					);
					client.newTransaction(
						interaction.member.id,
						violar,
						true,
						"Executou crime",
					);
					interaction.reply({ embeds: [violou] });
				}
				if (result === "Sequestro") {
					const sequestro = Math.floor(Math.random() * (15000 - 10000)) + 10000;
					doc.coins += sequestro;
					const sequestroemb = embed(
						`Sequestr*u um político, recebeu ${sequestro} moedas.`,
					);
					client.newTransaction(
						interaction.member.id,
						sequestro,
						true,
						"Executou crime",
					);
					interaction.reply({ embeds: [sequestroemb] });
				}
				if (result === "Estupro") {
					const estupro = Math.floor(Math.random() * (20000 - 15000)) + 15000;
					doc.coins += estupro;
					const estuproemb = embed(
						`Fez um crime grave, recebeu ${estupro} moedas.`,
					);
					client.newTransaction(
						interaction.member.id,
						estupro,
						true,
						"Executou crime",
					);
					interaction.reply({ embeds: [estuproemb] });
				}
				if (result === "Manipulação") {
					const manipulacao = Math.floor(Math.random() * (1000 - 0)) + 1;
					doc.coins += manipulacao;
					const manipulou = embed(
						`Você manipulou uma votação política, recebeu ${manipulacao} moedas.`,
					);
					client.newTransaction(
						interaction.member.id,
						manipulacao,
						true,
						"Executou crime",
					);
					interaction.reply({ embeds: [manipulou] });
				}
				if (result === "Hackear") {
					const hacker = Math.floor(Math.random() * (50000 - 30000)) + 30000;
					doc.coins += hacker;
					const emb = embed(
						`Você hackeou o presidente de um país, obtendo ${hacker} moedas.`,
					);
					client.newTransaction(
						interaction.member.id,
						hacker,
						true,
						"Executou crime",
					);
					interaction.reply({ embeds: [emb] });
				}
				doc.save();
			}
		}
		if (!doc) {
			new client.db.Users({ _id: interaction.member.id }).save();
			return interaction.reply({ embeds: [client.msg.embeds.registro] });
		}
	},
};
