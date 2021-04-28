const Discord = require("discord.js");


const Color = "#e99df1"
const red = "#e99df1"


module.exports = {
  name: "nickname",
  aliases: ["nick"],
  usage: "nickname <name>",
  description: "change the bots nickname",
  run: async (client, message, args) => {


    const invalidEmbed = new Discord.MessageEmbed()
            .setAuthor("Nickname Change Command", client.user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 2048
            }))
            .setColor(red)
            .setTitle("Invalid Arguments")
            .addFields({
                name: "USAGE",
                value: "```nick <user mention> <nickname>```"
            });

        function invalid(reason) {
            message.channel.send(
                new Discord.MessageEmbed(invalidEmbed)
                    .setTitle((reason)? reason : "Invalid Arguments")
            );
        }


const Perms = new Discord.MessageEmbed()
.setColor('#e99df1')
.setDescription("You don't have permission to perform this command!")

        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(Perms);
        

                const embed2 = new Discord.MessageEmbed()
                .setColor(red)
                .setDescription("You need to mention a user!")
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return invalid(embed2);
            

   const embed3 = new Discord.MessageEmbed()
                .setColor('#e99df1')
                .setDescription("You need to enter a new nickname!")


        let nick = args.slice(1).join(" ");
        if (!nick) return invalid(embed3);

        let messages = [];

        await member.setNickname(nick).then(() => {
            messages.push({
                message: `✅ Successfully changed **${member.user.username}**#${member.user.discriminator}'s nickname to **${nick}**`,
                type: "success"
            });
        }).catch(err => {
            messages.push({
                message: `🚫 Unable to change nickname for **${member.user.username}**#${member.user.discriminator}`,
                type: "error"
            });
        });

        const colorRanking = [
            {
                name: "success",
                color: Color
            },
            {
                name: "warning",
                color: Color
            },
            {
                name: "error",
                color: red
            }
        ];

        const embedColor = messages.reduce((color, message) => {
            const messageColorRank = colorRanking.findIndex(color => color.name === message.type);
            const currentColorRank = colorRanking.findIndex(color => color === color);

            if (messageColorRank > currentColorRank) color = colorRanking[messageColorRank].color;

            return color;
        }, Color);
                
        const successEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(messages.map(message => message.message));
        
        message.channel.send(successEmbed)






  }
}