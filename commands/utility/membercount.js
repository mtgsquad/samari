const Discord = require('discord.js');

module.exports = {
	name: 'membercount',
	description: 'The MemberCount Command',
	aliases: ['mc'],
	run: (client, message, args) => {
		const membersInServer = message.guild.memberCount;
		const memberEmbed = new Discord.MessageEmbed()
		.setColor('e99df1')
		.setTitle(`${message.guild.name} Has ${membersInServer}`)
		.setTimestamp()
		.setFooter('Samari')

		message.channel.send(memberEmbed)
	},
};