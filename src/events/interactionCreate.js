module.exports = (client, interaction) => {
	if (interaction.isStringSelectMenu()) {
		const regex = /^\d{19}$/;
		if (regex.test(interaction.customId)) {
			const role = interaction.guild.roles.cache.get(
				interaction.customId
			);
			if (interaction.member.roles.cache.has(role.id)) {
				interaction.member.roles.remove(role);
			} else {
				interaction.member.roles.add(role);
			}
		} else {
			require("../menu/" + interaction.customId)(client, interaction);
		}
	}
	if (interaction.isButton()) {
		if (interaction.customId.startsWith("abraçar"))
			return require("../button/hug")(client, interaction);
		if (interaction.customId.startsWith("beijar"))
			return require("../button/kiss")(client, interaction);
		if (interaction.customId.startsWith("matar"))
			return require("../button/kill")(client, interaction);
		if (interaction.customId.startsWith("bater"))
			return require("../button/punch")(client, interaction);
		if (interaction.customId.startsWith("tapa"))
			return require("../button/slap")(client, interaction);
		try {
			require("../button/" + interaction.customId)(client, interaction);
		} catch (error) {
			return 0;
		}
	}
	if (interaction.isChatInputCommand()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			command.execute(interaction, client);
		} catch (err) {
			if (err) console.error(err);
			interaction.reply({
				content: "Um erro foi executado no meu grande algoritmo.",
				ephemeral: true,
			});
		}
	}
};
