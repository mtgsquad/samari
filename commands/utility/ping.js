const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['pg'],
	run: (client, message, args) => {
		let pingEmbed = new Discord.MessageEmbed()

			.setAuthor(message.author.tag, message.member.user.displayAvatarURL({dynamic:true}))
            .setColor('#e99df1')
            .setThumbnail('https://media4.giphy.com/media/fvA1ieS8rEV8Y/200.gif')
            .setDescription(`**Ping** \n ${Date.now()  - message.createdTimestamp}ms.`)
			.setTimestamp()
			.setFooter('Samari');
		message.channel.send(pingEmbed)
	},
};