const Discord = require("discord.js");

module.exports = {
    name: 'say',
    description: 'Get the bot to say something for you!',
    run: (client, message, args) => {
        let sayMessage = args.join(' ');

        let sayEmbed = new Discord.MessageEmbed()
        .setColor('#e99df1')
        .setAuthor('Samari')
        .setTitle('A Wild Message Has Appeared!')
        .setDescription(sayMessage)
        .setTimestamp()
        .setFooter(`Message From: ${message.author.username}`);

        message.channel.send(sayEmbed);
    }
}