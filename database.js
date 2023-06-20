const { connect, Schema, model, set } = require("mongoose");

connect(process.env.DB, {})
	.then(() => console.log("[BANCO DE DADOS] | Carregado com sucesso"))
	.catch(() =>
		console.log("[ERRO] | Não foi possível se conectar ao banco de dados.")
	);

set("strictQuery", true);

const UserSchema = new Schema({
	_id: { type: String, required: true },
	coins: { type: Number, default: 0 },
	dailyCooldown: { type: Number, default: 0 },
	roubarCooldown: { type: Number, default: 0 },
	trabalharCooldown: { type: Number, default: 0 },
	crimeCooldown: { type: Number, default: 0 },
	transactions: [
		{
			reason: { type: String, required: true },
			received: { type: Boolean, default: false },
			time: { type: Date },
			money: { type: Number, required: true },
		},
	],
});

const PartnersStaffSchema = new Schema({
	_id: { type: String, required: true },
	partners: { type: Number },
});

module.exports.PartnersStaff = model("PartnersStaff", PartnersStaffSchema);
module.exports.Users = model("Users", UserSchema);
