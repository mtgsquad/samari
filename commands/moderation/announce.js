const Discord = require("discord.js");

const Color = "#f59cd7"
const red = "#ff04a9"

module.exports = {
  name: "announce",
  aliases: ["announcement"],
  usage: "Announce <Announcement>",
  description: "Create A New Announcement!",
  run: async (client, message, args) => {


                 const Perms = new Discord.MessageEmbed()
          .setColor('#e99df1')
          .setDescription('🚫 You Dont Have Permission To Do That! You Need The Permission **``Manage Messages``**.')
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(Perms)

    const Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if (!Channel || Channel.type === "voice") return message.channel.send(`Please Mention A Valid Announcement Text Channel!`);

    const Announce = args.slice(1).join(" ");


const embed2 = new Discord.MessageEmbed()
.setColor('#e99df1')
.setDescription("Please give an announcment!")

    if (!Announce) return message.channel.send(embed2);

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle(`New Announcement!`)
    .setDescription(Announce)
    .setFooter(`By ${message.author.username}`)
    .setTimestamp();

    await Channel.send(Embed);

    return message.channel.send(`Announcement Created, Check <#${Channel.id}>`);

  }
};