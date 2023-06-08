const discord = require("discord.js");
const ms = require("parse-ms-2");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("rob")
    .setNameLocalizations({
      "pt-BR": "roubar",
      "en-US": "rob",
    })
    .setDescription("Eii, faça roubos por aí."),
  async execute(interaction, client) {
    const respostas = [
      "Prisão",
      "Banco",
      "Supermercado",
      "Farmácia",
      "Joalheria",
      "Loja de Tecnologia",
      "Kuriel",
      "Escola",
      "The King Shop",
      "Petshop",
      "Restaurante",
    ];
    const resultadoAleatorio = Math.floor(Math.random() * respostas.length);
    const result =
      respostas[
        respostas.length === 1
          ? 0
          : resultadoAleatorio === 0
          ? resultadoAleatorio + 1
          : resultadoAleatorio - 1
      ];

    const doc = await client.db.Users.findOne({ _id: interaction.member.id });
    if (doc) {
      const delayTime = 10800000;
      if (delayTime - (Date.now() - doc.roubarCooldown) > 0) {
        const _time = ms(delayTime - (Date.now() - doc.roubarCooldown));
        const embed = new discord.EmbedBuilder()
          .setTitle(
            `Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para fazer roubos.`
          )
          .setColor(client.cor);
        return interaction.reply({ embeds: [embed] });
      }
      if (delayTime - (Date.now() - doc.roubarCooldown) < 0) {
        function embed(title) {
          return new discord.EmbedBuilder()
            .setTitle(title)
            .setColor(client.cor);
        }
        if (result === "Restaurante") {
          const restaurante = Math.floor(Math.random() * (5000 - 3000)) + 3000;
          doc.coins += restaurante;
          doc.roubarCooldown = Date.now();
          doc.save();
          client.newTransaction(
            interaction.member.id,
            restaurante,
            true,
            `Executou roubo`
          );
          const restauranteemb = embed(
            `Você foi em um restaurante, obtendo ${restaurante} moedas no roubo, além disso você aproveitou para comer.`
          );
          interaction.reply({ embeds: [restauranteemb] });
        }
        if (result === "The King Shop") {
          const theking = Math.floor(Math.random() * (2000 - 1000)) + 1000;
          doc.coins += theking;
          doc.roubarCooldown = Date.now();
          doc.save();
          client.newTransaction(
            interaction.member.id,
            theking,
            true,
            `Executou roubo`
          );
          const thekingshop = embed(
            `Você foi para o The King Shop, obtendo ${theking} moedas no roubo.`
          );
          interaction.reply({ embeds: [thekingshop] });
        }
        if (result === "Banco") {
          const banco = Math.floor(Math.random() * (10000 - 5000)) + 5000;
          doc.coins += banco;
          doc.roubarCooldown = Date.now();
          doc.save();
          client.newTransaction(
            interaction.member.id,
            banco,
            true,
            `Executou roubo`
          );
          const bancoemb = embed(
            `Você foi para o banco, obtendo ${banco} moedas no roubo.`
          );
          interaction.reply({ embeds: [bancoemb] });
        }
        if (result === "Supermercado") {
          const supermercado = Math.floor(Math.random() * (1000 - 0)) + 1;
          doc.coins += supermercado;
          doc.roubarCooldown = Date.now();
          doc.save();
          client.newTransaction(
            interaction.member.id,
            supermercado,
            true,
            `Executou roubo`
          );
          const supermercadoemb = embed(
            `Você foi para o supermercado, obtendo ${supermercado} moedas no roubo.`
          );
          interaction.reply({ embeds: [supermercadoemb] });
        }
        if (result === "Farmácia") {
          const farmacia = Math.floor(Math.random() * (1000 - 0)) + 1;
          doc.coins += farmacia;
          doc.roubarCooldown = Date.now();
          doc.save();
          client.newTransaction(
            interaction.member.id,
            farmacia,
            true,
            `Executou roubo`
          );
          const farmaciaemb = embed(
            `Você foi para a farmácia, obtendo ${farmacia} moedas no roubo.`
          );
          interaction.reply({ embeds: [farmaciaemb] });
        }
        if (result === "Joalheria") {
          const joalheria = Math.floor(Math.random() * (5000 - 1000)) + 1;
          doc.coins += joalheria;
          doc.roubarCooldown = Date.now();
          doc.save();
          client.newTransaction(
            interaction.member.id,
            joalheria,
            true,
            `Executou roubo`
          );
          const joalheriaemb = embed(
            `Você foi para a joalheria, obtendo ${joalheria} moedas no roubo.`
          );
          interaction.reply({ embeds: [joalheriaemb] });
        }
        if (result === "Loja de Tecnologia") {
          const tecnologialoja =
            Math.floor(Math.random() * (5000 - 1000)) + 1000;
          doc.coins += tecnologialoja;
          doc.roubarCooldown = Date.now();
          doc.save();
          client.newTransaction(
            interaction.member.id,
            tecnologialoja,
            true,
            `Executou roubo`
          );
          const loja = embed(
            `Você foi para a loja de tecnologia, obtendo ${tecnologialoja} moedas no roubo.`
          );
          interaction.reply({ embeds: [loja] });
        } else if (
          result === "Kuriel" ||
          result === "Escola" ||
          result === "Prisão" ||
          result === "Petshop"
        ) {
          let embedfalhado;
          doc.roubarCooldown = Date.now();
          doc.save();
          if (result === "Kuriel") {
            embedfalhado = embed(
              "Você tentou roubar o kuriel, mas ele te deu um banzão."
            );
          }
          if (result === "Escola") {
            embedfalhado = embed(
              "Porquê tu foi tentar roubar uma escola? O governo sempre coloca PIN em tudo caso não esteja na escola."
            );
          }
          if (result === "Prisão") {
            embedfalhado = embed("Você foi preso.");
          }
          if (result === "Petshop") {
            embedfalhado = embed(
              "Você roubou um pet no petshop. Infelizmente, você é um péssimo ladrão já que você não aguentou a fofura."
            );
          }
          interaction.reply({ embeds: [embedfalhado] });
        }
      }
    }
    if (!doc) {
      new client.db.Users({ _id: interaction.member.id }).save();
      return interaction.reply({ embeds: [client.msg.embeds.registro] });
    }
  },
};
