require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  sequelize,
  User,
  Project,
  Skill,
  Experience,
  Education,
  Certification,
  Setting,
} = require("../models");

const seed = async () => {
  try {
    // Ne JAMAIS forcer l'écrasement (force: true) pour préserver les données de production
    await sequelize.sync();

    // Si des données existent déjà (ex: admin, projets ajoutés), on n'écrase rien !
    const existingUsers = await User.count();
    if (existingUsers > 0) {
      console.log("ℹ️ Des données existent déjà dans la base. Le seed est ignoré pour protéger vos données.");
      process.exit(0);
    }
    console.log("Base de données initialisée pour la première fois.");

    const admin = await User.create({
      nom: "Gérard Jonathan Iahli Gong-Non Moundou",
      email: process.env.ADMIN_EMAIL || "gongnongerard05@gmail.com",
      mot_de_passe: await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin123!", 12),
      role: "admin",
    });

    await Setting.bulkCreate([
      {
        cle: "site_title",
        valeur: "Gérard Jonathan Iahli Gong-Non Moundou — Étudiant en CPGE | EPF Africa Dakar",
      },
      {
        cle: "site_description",
        valeur:
          "Portfolio personnel de Gérard Jonathan Iahli Gong-Non Moundou, étudiant en Classes Préparatoires aux Grandes Écoles (CPGE) à EPF Africa Dakar.",
      },
      {
        cle: "hero_title",
        valeur: "Étudiant en Classes Préparatoires (CPGE)",
      },
      {
        cle: "hero_subtitle",
        valeur: "Classes Préparatoires aux Grandes Écoles (CPGE) — EPF Africa Dakar",
      },
      {
        cle: "bio",
        valeur:
          "Étudiant en Classes Préparatoires aux Grandes Écoles (CPGE) à EPF Africa Dakar. Passionné par les sciences, l'analyse rigoureuse et la résolution de problèmes complexes en mathématiques, physique et sciences de l'ingénieur.",
      },
      {
        cle: "career_goal",
        valeur:
          "Poursuivre mon cursus en école d'ingénieurs et approfondir mes compétences scientifiques et techniques au service de projets innovants.",
      },
      {
        cle: "email",
        valeur: "gongnongerard05@gmail.com",
      },
      {
        cle: "phone",
        valeur: "",
      },
      {
        cle: "location",
        valeur: "Dakar, Sénégal",
      },
      {
        cle: "social_links",
        valeur: JSON.stringify({
          github: "",
          linkedin: "",
          twitter: "",
        }),
      },
      {
        cle: "about_title",
        valeur: "Rigueur scientifique et esprit d'analyse.",
      },
      {
        cle: "about_text",
        valeur:
          "Actuellement en Classes Préparatoires aux Grandes Écoles (CPGE) à EPF Africa Dakar, je construis des bases solides en mathématiques, physique et sciences de l'ingénieur, tout en développant méthode, autonomie et capacité de modélisation.",
      },
      {
        cle: "about_languages",
        valeur: "",
      },
      {
        cle: "cv_password",
        valeur: "2026",
      },
      {
        cle: "profile_photo",
        valeur: "/images/profil.png",
      },
      {
        cle: "about_photo",
        valeur: "/images/about.png",
      },
      {
        cle: "cv_path",
        valeur: "",
      },
    ]);

    // Aucune compétence, projet, expérience ou certification fictive n'est insérée par défaut.
    // Ajoutez vos éléments réels depuis l'interface d'administration (/admin).

    await Education.bulkCreate([
      {
        intitule: "Classes Préparatoires aux Grandes Écoles (CPGE)",
        etablissement: "EPF Africa Dakar",
        date_debut: new Date().toISOString().slice(0, 10),
        date_fin: null,
        description:
          "Formation scientifique pluridisciplinaire : mathématiques, physique, sciences de l'ingénieur et méthodologie de résolution de problèmes.",
        user_id: admin.id,
      },
    ]);

    console.log("Données initiales insérées pour Gérard Jonathan Iahli Gong-Non Moundou.");
    console.log(`Admin: ${admin.email} / ${process.env.ADMIN_PASSWORD || "Admin123!"}`);
    process.exit(0);
  } catch (error) {
    console.error("Erreur seed:", error);
    process.exit(1);
  }
};

seed();
