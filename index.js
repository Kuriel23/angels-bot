const discord = require("discord.js");
require("dotenv").config();

const client = new discord.Client({
	intents: 3276799,
	cacheWithLimits: {
		MessageManager: {
			sweepInterval: 300,
			sweepFilter: discord.Sweepers.filterByLifetime({
				lifetime: 60,
				getComparisonTimestamp: (m) => m.editedTimestamp ?? m.createdTimestamp,
			}),
		},
	},
});

client.cor = "#551a87";
client.db = require("./database");
client.canais = {
	errors: "1116389089881636896",
};
client.msg = {
	embeds: {
		registro: new discord.EmbedBuilder()
			.setTitle("Tente novamente, novo registro no banco de dados.")
			.setColor(client.cor),
		failedUser: new discord.EmbedBuilder()
			.setTitle("Usuário não reconhecido.")
			.setColor(client.cor),
		noMoney: new discord.EmbedBuilder()
			.setTitle("Sem Dinheiro.")
			.setColor(client.cor),
	},
	content: {
		invalid: "4lg0 deu errad0 n0 meu s1stema, b1p-bup!",
	},
};
client.newTransaction = async (id, money, received = true, reason = "") => {
	const user = await client.db.Users.findOne({ _id: id });
	if (user) {
		user.transactions.push({
			reason,
			received,
			time: new Date(),
			money,
		});
		user.save();
	}
};

process.on("unhandledRejection", (error) => {
	console.log(error);
	client.channels.cache
		.get(client.canais.errors)
		.send(`Erro detectado: \n${error}`);
});
process.on("uncaughtException", (error) => {
	console.log(error);
	client.channels.cache
		.get(client.canais.errors)
		.send(`Erro detectado: \n${error}`);
});

const boilerplateComponents = async () => {
	await require("./src/util/boilerplateClient")(client);
};

boilerplateComponents();
