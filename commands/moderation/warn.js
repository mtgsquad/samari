const Discord = require('discord.js');
const profileModel = require('../../models/profileSchema');
module.exports = {
	name: 'warn',
	description: 'Warn a user, Remember this is irreversible, so please make sure that you want to warn the user!',
	usage: '<@user>',
	run: async(client, message, args, profileData) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have the **Administrator** permssion which is required to run this command.');

		let target = message.mentions.users.first();
		let warnReason = args.slice(1).join(" ");

		if(!target) return message.channel.send('Mention someone so that I can issue them a warning.');
		if(!warnReason) return message.channel.send('Provide a reason for the warning');

		let updateWarnAmount = '1';

		// embed
		let warnEmbed = new Discord.MessageEmbed()
		.setTitle('Warn Command')
		.addFields(
			{name: 'Warning Issued To:', value: `${target}`, inline: true},
			{name: 'Reason:', value: `${warnReason}`, inline: true},
			{name: 'Warned By:', value: `${message.author}`, inline: true},
		)
		.setColor('#e99df1')
		.setFooter('Samari')
		.setTimestamp();
		
		

		try{
			await profileModel.findOneAndUpdate(
				{
                    userID: target.id,
                },
                {
                    $inc: {
                        warns: updateWarnAmount,
                    },
                }
			).then(
				message.channel.send(warnEmbed)
			)
		}catch(err){
			console.log(err)
		}

	}
}