module.exports = async (client, message) => {
	if (message.guild === null) return;

	if (message.author.bot) return 0;
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
