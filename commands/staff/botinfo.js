const Discord = require('discord.js');

module.exports = {
    name: "botinfo",
    aliases: ['samari'],
    description: "Stats About Samari.",
    run: (client, message, args, profileData) => {
		if(profileData.role === 'staff') {
        let sStatsEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('#e99df1')
        .setTitle('Samari')
        .setDescription(`Samari Is Currently In ${client.guilds.cache.size} Servers & Has ${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} Users!`)
        .setTimestamp()
        .setFooter('Samari')

        message.channel.send(sStatsEmbed);
		} else {
			message.channel.send('You do not have permissions to access this command.')
		}
    }
}