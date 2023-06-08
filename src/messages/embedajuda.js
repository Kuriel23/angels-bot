const discord = require("discord.js");

module.exports = async (client, message) => {
	message.delete();
	const row = new discord.ActionRowBuilder().addComponents(
		new discord.StringSelectMenuBuilder()
			.setCustomId("ticket")
			.setPlaceholder("Escolha 1 tópico")
			.addOptions([
				{
					label: "Suporte",
					value: "suporte",
				},
				{
					label: "Compra de VIP's",
					value: "vip",
				},
			])
	);
	const embed = new discord.EmbedBuilder()
		.setColor(client.cor)
		.setTitle("SUPORTE")
		.setDescription(
			"Está com dúvidas sobre como entrar em contato conosco? Basta criar um ticket! Estamos disponíveis para atendê-lo em caso de denuncias, pedidos de vip."
		)
		.setImage("https://i.imgur.com/dl2kDNi.jpeg");
	message.channel.send({ embeds: [embed], components: [row] });
};
