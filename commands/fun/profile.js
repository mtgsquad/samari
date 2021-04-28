const Discord = require("discord.js")

module.exports = {
    name: "profile",
    aliases: ['p'],
    description: "Profile Info Command",
    run: (client, message, args, profileData) => {
        let authorInfoEmbed = new Discord.MessageEmbed()
		.setColor('#e99df1')
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({dynamic:true}))
        .setTitle(message.author.username)
        .addFields(
            { name: "User ID:", value: `${message.author.id}` },
            { name: "Account Created At:", value: `${message.author.createdAt}` },
            { name: "Full Username & Tag:", value: `${message.author.tag}` },
			{ name: "Wallet:", value: `${profileData.sCoins} sCoins`},
			{ name: "Bank:", value: `${profileData.bank} sCoins`},
			{ name: "Samari Role:", value: `${profileData.role.toUpperCase()}` }
        )
        .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
		.setFooter('Samari')
		.setTimestamp();


        message.channel.send(authorInfoEmbed)
    }
}