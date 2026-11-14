require("dotenv").config();
const readline = require("readline");
const bcrypt = require("bcrypt");
const { sequelize, User } = require("../models");

const ask = (rl, question) =>
  new Promise((resolve) => rl.question(question, (ans) => resolve(ans.trim())));

const createAdmin = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const nom =
      process.env.ADMIN_NAME ||
      (await ask(
        rl,
        "Nom complet (Entrée pour 'Gérard Jonathan Iahli Gong-Non Moundou') : "
      )) ||
      "Gérard Jonathan Iahli Gong-Non Moundou";

    const email =
      process.env.ADMIN_EMAIL ||
      (await ask(rl, "Email administrateur : "));

    const password =
      process.env.ADMIN_PASSWORD ||
      (await ask(rl, "Mot de passe (min. 8 caractères) : "));

    rl.close();

    if (!email || !email.includes("@")) {
      console.error("❌ Adresse e-mail invalide.");
      process.exit(1);
    }
    if (!password || password.length < 8) {
      console.error("❌ Le mot de passe doit contenir au moins 8 caractères.");
      process.exit(1);
    }

    await sequelize.sync();
    const hashedPassword = await bcrypt.hash(password, 12);

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      await existing.update({
        nom,
        mot_de_passe: hashedPassword,
        role: "admin",
      });
      console.log(`✅ Administrateur mis à jour : ${email}`);
    } else {
      await User.create({
        nom,
        email,
        mot_de_passe: hashedPassword,
        role: "admin",
      });
      console.log(`✅ Administrateur créé : ${email}`);
    }

    process.exit(0);
  } catch (error) {
    rl.close();
    console.error(
      "❌ Erreur lors de la création de l'administrateur :",
      error.message || error
    );
    process.exit(1);
  }
};

createAdmin();
