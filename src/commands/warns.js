const discord = require('discord.js');

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('warns')
		.setNameLocalizations({
			'pt-BR': 'advertências',
			'en-US': 'warns',
		})
		.setDescription('Veja as advertências de um usuário!')
		.setDefaultMemberPermissions(
			discord.PermissionFlagsBits.ModerateMembers,
		)
		.addUserOption(option =>
			option
				.setName('usuário')
				.setNameLocalizations({ 'pt-BR': 'usuário', 'en-US': 'user' })
				.setDescription('Identifique o utilizador')
				.setRequired(true),
		),
	async execute(interaction, client) {
		const member = interaction.options.getMember('usuário');

		const doc = await client.db.Users.findOne({ _id: member.id });

		if (doc) {
			const emb = new discord.EmbedBuilder()
				.setColor(client.cor)
				.setTitle(
					`Advertências de ${member.tag} (${doc.warns.length})`,
				)
				.setDescription(
					`${doc.warns
						.map((warn, index) => {
							return `${warn.reason} | por <@${warn.by}>`;
						})
						.join('\n')}`,
				);
			return interaction.reply({ embeds: [emb] });
		}
		new client.db.Users({
			_id: member.id,
		}).save();
		return interaction.reply({
			content: 'Este usuário não tem advertências salvas.',
		});
	},
};
