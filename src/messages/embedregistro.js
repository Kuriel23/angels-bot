const discord = require("discord.js");

module.exports = async (client, message) => {
	message.delete();
	const row = new discord.ActionRowBuilder().addComponents(
		new discord.StringSelectMenuBuilder()
			.setCustomId("ticket")
			.setPlaceholder("Selecione 1 pronome")
			.addOptions([
				{
					label: "🔵𝐸𝐿𝐸/𝐷𝐸𝐿𝐸",
					value: "1115396252897660948",
				},
				{
					label: "🟣𝐸𝐿𝐴/𝐷𝐸𝐿𝐴",
					value: "1115396620700356648",
				},
				{
					label: "🟡𝐸𝐿𝑈/𝐷𝐸𝐿𝑈",
					value: "1115397147601424446",
				},
				{
					label: "🟡𝑂𝑈𝑇𝑅𝑂𝑆 𝑃𝑅𝑂𝑁𝑂𝑀𝐸𝑆",
					value: "1115397296608260127",
				},
			]),
	);
	const row2 = new discord.ActionRowBuilder().addComponents(
		new discord.StringSelectMenuBuilder()
			.setCustomId("ticket")
			.setPlaceholder("Selecione 1 ping")
			.addOptions([
				{
					label: "⭐ Parcerias",
					value: "1114235343093375067",
				},
				{
					label: "⭐Eventos/sorteios",
					value: "1114235663232012328",
				},
				{
					label: "⭐Revive chat/call",
					value: "1115854719265538078",
				},
				{
					label: "⭐Jornal",
					value: "1114237566187749557",
				},
				{
					label: "⭐Youtube",
					value: "1114237843842281483",
				},
				{
					label: "⭐Avisos",
					value: "1114236316394209341",
				},
			]),
	);
	const row3 = new discord.ActionRowBuilder().addComponents(
		new discord.StringSelectMenuBuilder()
			.setCustomId("ticket")
			.setPlaceholder("Selecione 1 jogo")
			.addOptions([
				{
					label: "⭐Roblox",
					value: "1114235733293670431",
				},
				{
					label: "⭐Free fire",
					value: "1114235869541449818",
				},
				{
					label: "⭐Fortnite",
					value: "1114236132629172274",
				},
				{
					label: "⭐Minecraft",
					value: "1114236553053618216",
				},
				{
					label: "⭐Gta 5",
					value: "1114236838333382757",
				},
				{
					label: "⭐league of legends",
					value: "1114240218573328504",
				},
				{
					label: "⭐Valorant",
					value: "1116082333834022912",
				},
			]),
	);
	const embed = new discord.EmbedBuilder()
		.setColor(client.cor)
		.setTitle("╔═══❖•ೋ° 𝑃𝑅𝑂𝑁𝑂𝑀𝐸𝑆°ೋ•❖═══╗")
		.setDescription(
			"┃°ೋ• <@&1115396252897660948> ﹐♡﹐⪨\n┃°ೋ•<@&1115396620700356648> ﹐♡﹐⪨\n┃°ೋ•<@&1115397147601424446>  ﹐♡﹐⪨\n┃°ೋ•<@&1115397296608260127>﹐♡﹐⪨",
		)
		.setImage("https://i.imgur.com/So5UkJc.jpeg");
	const embed2 = new discord.EmbedBuilder()
		.setColor(client.cor)
		.setTitle("╔═══❖•ೋ° 𝑃𝐼𝑁𝐺𝑆 °ೋ•❖═══╗")
		.setDescription(
			"┃°ೋ•<@&1114235343093375067> ﹐♡﹐⪨\n┃°ೋ•<@&1114235663232012328>﹐♡﹐⪨\n┃°ೋ•<@&1115854719265538078>﹐♡﹐⪨  \n┃°ೋ•<@&1114237566187749557>﹐♡﹐⪨ \n┃°ೋ•<@&1114237843842281483>﹐♡﹐⪨\n┃°ೋ•<@&1114236316394209341>﹐♡﹐⪨",
		)
		.setImage("https://i.imgur.com/Cj15mpb.jpeg");
	const embed3 = new discord.EmbedBuilder()
		.setColor(client.cor)
		.setTitle("╔═══❖•ೋ° 𝐺𝐴𝑀𝐸𝑆 °ೋ•❖═══╗")
		.setDescription(
			"🎮┃°ೋ•<@&1114235733293670431>﹐♡﹐♡\n🕹️┃°ೋ•<@&1114235869541449818>﹐♡﹐♡\n🎮┃°ೋ•<@&1114236132629172274> ﹐♡﹐♡\n🕹️┃°ೋ•<@&1114236553053618216> ﹐♡﹐♡\n🎮┃°ೋ•<@&1114236838333382757>﹐♡﹐♡\n🕹️┃°ೋ•<@&1114240218573328504>﹐♡﹐♡\n🎮┃°ೋ•<@&1116082333834022912> ﹐♡﹐♡",
		)
		.setImage("https://i.imgur.com/Y4Ms8lL.jpeg");
	await message.channel.send({ embeds: [embed], components: [row] });
	await message.channel.send({ embeds: [embed2], components: [row2] });
	await message.channel.send({ embeds: [embed3], components: [row3] });
};
