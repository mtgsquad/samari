const Discord = require('discord.js');

module.exports = {
    name: 'balance',
    description: 'Check your account balance!',
    usage: '',
    aliases: ['bal'],
    run: (client, message, args, profileData) => {
        let balEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`)
            .setTitle(`${message.author.tag}'s Balance`)
            .setDescription(`Wallet: ${profileData.sCoins} sCoins\nBank: ${profileData.bank} sCoins`)
            .setColor('#e99df1')
            .setTimestamp()
            .setFooter('Samari')

        message.channel.send(balEmbed)
    }
}