//─────────────────────────────────────────────────────────────────────────────────────\\
//──────────────────────────────────── HELP CMD ───────────────────────────────────────\\
//─────────────────────────────────────────────────────────────────────────────────────\\
//                              2025 COPYRIGHT userpy                                  \\
//─────────────────────────────────────────────────────────────────────────────────────\\

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche la liste des commandes disponibles sur le serveur'),

    async execute(interaction) {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //Il faudra avoir le index.js avec la lecture des commands (./commands) ainsi qu'un deploy-commands.js ou un deploy via le index.js
        const commandsList = [];

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            commandsList.push(`\`/${command.data.name}\` - ${command.data.description}`);
        }

        const helpEmbed = new EmbedBuilder()
            .setColor(0x030303)
            .setTitle('Commandes disponibles')
            .setDescription(commandsList.join('\n'))
            .setFooter({ text: 'Utilise /<nom_commande> pour exécuter une commande.' });

        await interaction.reply({ embeds: [helpEmbed] });
    },
};


//Explication !

//const SlashCommandBuilder : Déployer des commandes / (const à ajouter dans le index.js)
//const EmbedBuilder : Construire une Embed sur Discord (const à ajouter dans le index.js)
//const PermissionFlagsBits : Ajouter une interaction éphémère (visible pour soi-même uniquement)


//.setName : Ajouter le nom de la commande
//.setDescription : Ajouter la description de la commande
//const helpEmbed = new EmbedBuilder() : Permet de crée une nouvelle embed avec Titre, Description, Image, Footer, ect...
//.setColor(0x00000) : Permet d'ajouter une couleur à l'embed