const Discord = require("discord.js");

const Color = "#f59cd7"
const red = "#ff04a9"

module.exports = {
  name: "close",
  aliases: [],
  usage: "close",
  description: "close a ticket",
  run: async (client, message, args) => {





if (!message.channel.name.startsWith(`ticket-`)) {
    const embed8 = new Discord.MessageEmbed()
    .setColor('#e99df1')
    .addField(`**You can't use the this outside of a ticket channel.**`)
    message.channel.send({ embed: embed8 });
    return;

}

 const embed9 = new Discord.MessageEmbed()
 .setColor(Color)
    .addField('**Are you sure? Once confirmed, you cannot reverse this action!**\n**To confirm, type \`confirm\`. This will time out in 10 seconds and be cancelled.**')
    message.channel.send({ embed: embed9 })
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('**Ticket close timed out, the ticket was not closed.**').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
  }

}

function response(c) {
  while (true) {
    client.on("message", (message) => {
      if(message.channel == c) {
        return message.content;
      }
    });


  }
}



