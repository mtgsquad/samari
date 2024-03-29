const items = require('../../shopitems');
const Discord = require('discord.js');
module.exports = {
	name: 'shop',
	usage: '',
	aliases: ['items'],
	description: 'List all items available in the shop',
	run: async(client, message, args) => {
		if(items.length === 0) return message.channel.send('There are no items available for sale!');

			const itemsList = [];
			items.forEach(value => {
			itemsList.push(
            {name: `${value.item}`, value: `**Price:** ${value.price}\n**Description:** ${value.description}`}
        	)
            });
            
				const shopEmbed = new Discord.MessageEmbed()
				.setColor('#FFB6C1')
				.setFooter('Samari')
				.setTitle('Shop')
				.setDescription('Samari Official Shop')
				.addFields(itemsList)
				.setTimestamp();

		message.channel.send(shopEmbed);
	}
}