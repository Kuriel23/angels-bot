const discord = require('discord.js');

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('rank_warn')
		.setNameLocalizations({
			'pt-BR': 'classificação_adv',
			'en-US': 'rank_warns',
		})
		.setDescription('Veja classificação das advertências!'),
	async execute(interaction, client) {
		await interaction.reply({ content: 'Pesquisando contéudo...' });
		let page;
		let buttonname;
		let collector;
		await Search(1);
		async function Search(pagina) {
			const partners = await client.db.Users.paginate(
				{},
				{ page: pagina, limit: 15, sort: { warns: -1 } },
			).catch(err => {
				if (err)
					return interaction.editReply({
						content: 'Falha a pesquisar...',
					});
			});
			page = partners.page;

			const str2 = Math.floor(Math.random() * 100);
			buttonname = str2;
			const antes = new discord.ButtonBuilder()
				.setCustomId(str2 + 'prev')
				.setEmoji('1065370746303553587')
				.setStyle(2)
				.setDisabled(!partners.hasPrevPage);
			const depois = new discord.ButtonBuilder()
				.setCustomId(str2 + 'next')
				.setEmoji('1065370743526916096')
				.setStyle(2)
				.setDisabled(!partners.hasNextPage);
			const botao = new discord.ActionRowBuilder()
				.addComponents(antes)
				.addComponents(depois);
			const parceriasEmb = new discord.EmbedBuilder()
				.setTitle('🏆 » TOP 15 PESSOAS COM MAIS WARNS')
				.setFooter({
					text: `Página ${partners.page} de ${partners.totalPages} páginas`,
				})
				.setColor(client.cor);
			if (partners.docs[0]) {
				const fields = partners.docs.map((w, index) => ({
					name: `${partners.pagingCounter + index}. ${
						interaction.guild.members.cache.get(w._id)
							? interaction.guild.members.cache.get(w._id).user
									.username
							: w._id
					}`,
					value: `┗ **Warns**: ${w.warns.length}`,
					inline: true,
				}));

				parceriasEmb.addFields(...fields);
			}
			const mensagem = await interaction.editReply({
				content: null,
				embeds: [parceriasEmb],
				components: [botao],
			});
			const filter = interaction =>
				interaction.customId === buttonname + 'next' ||
				interaction.customId === buttonname + 'prev';
			collector = mensagem.createMessageComponentCollector({
				filter,
				time: 300000,
			});
		}
		collector.on('collect', i => {
			if (i.user.id === interaction.member.id) {
				if (i.customId === buttonname + 'next') {
					i.deferUpdate();
					Search(page + 1);
				}
				if (i.customId === buttonname + 'prev') {
					i.deferUpdate();
					Search(page - 1);
				}
			} else {
				i.reply({
					content: 'Conteúdo inválido para apresentar.',
					ephemeral: true,
				});
			}
		});
	},
};
