const bcrypt = require("bcrypt");
const { User } = require("../models");

/**
 * Initialise ou met à jour l'administrateur au démarrage si
 * ADMIN_EMAIL et ADMIN_PASSWORD sont définis dans l'environnement.
 */
const ensureAdminFromEnv = async () => {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const nom =
    process.env.ADMIN_NAME?.trim() ||
    "Gérard Jonathan Iahli Gong-Non Moundou";

  if (!email || !password) {
    return;
  }

  if (!email.includes("@")) {
    console.warn("⚠️ ADMIN_EMAIL invalide : création admin ignorée.");
    return;
  }

  if (password.length < 8) {
    console.warn(
      "⚠️ ADMIN_PASSWORD trop court (min. 8 caractères) : création admin ignorée."
    );
    return;
  }

  const existing = await User.findOne({ where: { email } });

  if (!existing) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role: "admin",
    });
    console.log(`✅ Administrateur créé depuis l'environnement : ${email}`);
    return;
  }

  const samePassword = await bcrypt.compare(password, existing.mot_de_passe);
  if (!samePassword || existing.nom !== nom) {
    const updates = { nom, role: "admin" };
    if (!samePassword) {
      updates.mot_de_passe = await bcrypt.hash(password, 12);
    }
    await existing.update(updates);
    console.log(`✅ Administrateur mis à jour depuis l'environnement : ${email}`);
  }
};

module.exports = ensureAdminFromEnv;
