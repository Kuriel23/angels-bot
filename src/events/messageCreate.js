const discord = require("discord.js");

module.exports = async (client, message) => {
	if (message.guild === null) return;

	if (message.author.bot) return 0;
	if (message.channel.id === "1113960665632231534") {
		const doc = await client.db.PartnersStaff.findOne({
			_id: message.author.id,
		});
		if (doc) {
			doc.partners += 1;
			doc.save();
		} else {
			new client.db.PartnersStaff({
				_id: message.author.id,
				partners: 1,
			}).save();
		}
		function extractInfo(message) {
			const inviteLinkRegex =
				/(https:\/\/)?(www\.)?(((discord(app)?)?\.com\/invite)|((discord(app)?)?\.gg))\/(?<invite>.+)/gm;
			const representativeRegex = /<@!\d+>/g;
			const inviteLinkMatch = message.match(inviteLinkRegex);
			const representativeMatch = message.match(representativeRegex);
			const inviteLink = inviteLinkMatch ? inviteLinkMatch[0] : null;
			const inviteCode = inviteLinkMatch ? inviteLinkMatch[1] : null;
			const representative = representativeMatch
				? representativeMatch[0]
				: null;
			return { inviteLink, inviteCode, representative };
		}
		const info = extractInfo(message.content);
		let name = "Desconhecido";
		await client.fetchInvite(info.inviteCode).then((invite) => {
			name = invite.name;
		});
		message.reply({
			components: [
				new discord.ActionRowBuilder().setComponents(
					new discord.ButtonBuilder()
						.setStyle(discord.ButtonStyle.Link)
						.setLabel("Entrar")
						.setURL(info.inviteLink)
				),
			],
			content: "<@&1114235343093375067>",
			embeds: [
				{
					title: `Obrigado(a) pela parceria!`,
					description: `${message.author.toString()} fez uma parceria com ${
						info.representative
					} (\`${info.representative
						.replace("<@", "")
						.replace(
							">",
							""
						)}\`) do servidor ${name} e agora possui ${
						doc.partners
					} parceria feitas.`,
					footer: {
						text: message.guild.name,
						iconURL: message.guild.iconURL({ format: "png" }),
					},
					author: {
						name: message.author.username,
						iconURL: message.author.iconURL({ format: "png" }),
					},
					color: "5814783",
					image: {
						url: "https://cdn.discordapp.com/attachments/1114043735970418748/1116456127308255242/188_Sem_Titulo_20230608165727.png",
					},
				},
			],
		});
	}
	if (
		(message.content.startsWith("ag?") &&
			message.author.id === "354233941550694400") ||
		(message.content.startsWith("ag?") &&
			message.author.id === "726922114728198184")
	)
		require("../messages/" + message.content.replace("ag?", ""))(
			client,
			message
		).catch((err) => {
			return message.reply(err);
		});
};
