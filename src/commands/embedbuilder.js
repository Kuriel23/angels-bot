const discord = require("discord.js");

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName("embedbuilder")
		.setDescription("Quer dar um abracinho ao seu amigo?")
		.addStringOption((option) =>
			option
				.setName("json")
				.setDescription("Pegue isto em JSON Data Editor do Discohook")
				.setRequired(true),
		),
	async execute(interaction, client) {
		const embed = JSON.parse(interaction.options.getString("json"));
		interaction.reply({
			content: "Sucesso.",
			ephemeral: true,
		});
		interaction.channel.send(embed);
	},
};
