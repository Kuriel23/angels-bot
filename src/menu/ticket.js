const { PermissionFlagsBits } = require("discord.js");
const discord = require("discord.js");

module.exports = async (client, interaction) => {
	const tagger = interaction.user.tag;
	switch (interaction.values[0]) {
		case "suporte":
			if (
				interaction.guild.channels.cache.find(
					(c) => c.name === `${tagger}-suporte`
				)
			) {
				const c = interaction.guild.channels.cache.find(
					(c) => c.name === `${tagger}-suporte`
				);
				interaction.reply({
					content: `Você já possui um ticket aberto em ${c}.`,
					ephemeral: true,
				});
			} else {
				interaction.guild.channels
					.create({
						name: `${tagger}-suporte`,
						type: 0,
						parent: "1113658704563294339",
						permissionOverwrites: [
							{
								id: interaction.guild.id,
								deny: [PermissionFlagsBits.ViewChannel],
							},
							{
								id: interaction.user.id,
								allow: [
									PermissionFlagsBits.ViewChannel,
									PermissionFlagsBits.SendMessages,
									PermissionFlagsBits.AttachFiles,
									PermissionFlagsBits.AddReactions,
								],
							},
							{
								id: "1113955520265584660",
								allow: [
									PermissionFlagsBits.ViewChannel,
									PermissionFlagsBits.SendMessages,
									PermissionFlagsBits.AttachFiles,
									PermissionFlagsBits.AddReactions,
								],
							},
						],
					})
					.then((c) => {
						interaction.reply({
							content: `Seu ticket foi aberto em ${c}.`,
							ephemeral: true,
						});

						const embed = new discord.EmbedBuilder()
							.setAuthor({
								name: interaction.guild.name,
								iconURL: interaction.guild.iconURL({
									dynamic: true,
								}),
							})
							.setColor(client.cor)
							.setDescription(
								`Olá, ${interaction.user.username}, boas vindas ao seu ticket!\nAguarde alguns instantes para receber ajuda.`
							);

						const botao =
							new discord.ActionRowBuilder().addComponents(
								new discord.ButtonBuilder()
									.setCustomId("closeTicket")
									.setEmoji("🔒")
									.setLabel("Fechar Ticket")
									.setStyle(2)
							);

						c.send({
							content: "<@&1113955520265584660>",
							embeds: [embed],
							components: [botao],
						}).then((msg) => msg.pin());
					});
			}
			break;
		case "vip":
			if (
				interaction.guild.channels.cache.find(
					(c) => c.name === `${tagger}-vip`
				)
			) {
				const c = interaction.guild.channels.cache.find(
					(c) => c.name === `${tagger}-vip`
				);
				interaction.reply({
					content: `Você já possui um ticket aberto em ${c}.`,
					ephemeral: true,
				});
			} else {
				interaction.guild.channels
					.create({
						name: `${tagger}-vip`,
						type: 0,
						parent: "1113658704563294339",
						permissionOverwrites: [
							{
								id: interaction.guild.id,
								deny: [PermissionFlagsBits.ViewChannel],
							},
							{
								id: interaction.user.id,
								allow: [
									PermissionFlagsBits.ViewChannel,
									PermissionFlagsBits.SendMessages,
									PermissionFlagsBits.AttachFiles,
									PermissionFlagsBits.AddReactions,
								],
							},
							{
								id: "1113955520265584660",
								allow: [
									PermissionFlagsBits.ViewChannel,
									PermissionFlagsBits.SendMessages,
									PermissionFlagsBits.AttachFiles,
									PermissionFlagsBits.AddReactions,
								],
							},
						],
					})
					.then((c) => {
						interaction.reply({
							content: `Seu ticket foi aberto em ${c}.`,
							ephemeral: true,
						});

						const embed = new discord.EmbedBuilder()
							.setAuthor({
								name: interaction.guild.name,
								iconURL: interaction.guild.iconURL({
									dynamic: true,
								}),
							})
							.setColor(client.cor)
							.setDescription(
								`Olá, ${interaction.user.username}, boas vindas ao seu ticket!\nAguarde alguns instantes para receber uma resposta da nossa equipe.`
							);

						const botao =
							new discord.ActionRowBuilder().addComponents(
								new discord.ButtonBuilder()
									.setCustomId("closeTicket")
									.setEmoji("🔒")
									.setLabel("Fechar Ticket")
									.setStyle(2)
							);

						c.send({
							content: "<@&1113955520265584660>",
							embeds: [embed],
							components: [botao],
						}).then((msg) => msg.pin());
					});
			}
			break;
	}
};
