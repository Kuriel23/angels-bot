const discord = require('discord.js');

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('warn')
		.setNameLocalizations({
			'pt-BR': 'advertência',
			'en-US': 'warn',
		})
		.setDescription('Adverter um usuário!')
		.setDefaultMemberPermissions(
			discord.PermissionFlagsBits.ModerateMembers,
		)
		.addUserOption(option =>
			option
				.setName('usuário')
				.setNameLocalizations({ 'pt-BR': 'usuário', 'en-US': 'user' })
				.setDescription('Identifique o utilizador')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('motivo')
				.setNameLocalizations({ 'pt-BR': 'motivo', 'en-US': 'reason' })
				.setDescription('Identifique um motivo para o aviso')
				.setRequired(true),
		),
	async execute(interaction, client) {
		const member = interaction.options.getMember('usuário');
		const reason =
			interaction.options.getString('motivo') ||
			'Nenhum motivo foi fornecido.';

		const doc = await client.db.Users.findOne({ _id: member.id });

		if (doc) {
			const warnsQt = doc.warns.length;
			async function Mute(time) {
				await member.timeout(time, reason).catch(error => {
					if (error)
						return interaction.reply({
							content:
								'É impossível realizar tal ação contra este usuário.',
						});
				});
			}
			if (warnsQt === 1) Mute(3600000);
			if (warnsQt >= 2 && warnsQt <= 5) Mute(10800000);
			else if (warnsQt >= 5) Mute(10800000);
			member
				.send({
					content:
						'Você foi avisado por ' +
						reason +
						'. Comporte-se para não receber mais punições desse tipo.',
				})
				.catch(err => {
					if (err)
						interaction.channel.send({
							content: `${member}, Você foi avisado por ${reason}. Comporte-se para não receber mais punições desse tipo.`,
						});
				});
			doc.warns.push({ reason, by: interaction.member.id });
			doc.save();
		} else {
			new client.db.Users({
				_id: member.id,
				warns: [{ reason, by: interaction.member.id }],
			}).save();
		}
		return interaction.reply({
			content: `${member} foi alertado com sucesso.`,
		});
	},
};
