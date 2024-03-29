 const Discord = require("discord.js");
 const Color = "#e99df1"
const red = "#ff04a9"


const choices = ["🗿", "🧾", "✂️"];

module.exports = {
  name: "rps",
  aliases: [],
  usage: "rps",
  description: "play rock paper sccisors",
  run: async (client, message, args) => {



     if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I don't have permission to play Rock Paper Scissors");

        const rpsEmbed = new Discord.MessageEmbed()
        .setColor(Color)
            .setTitle("**Choose:**")
            .setDescription("🗿 | `Rock`\n 🧾 | `Paper`\n ✂️ | `Scissors`")

        const msg = await message.channel.send(rpsEmbed);
        for (let x = 0; x < choices.length; x++) {
          await msg.react(choices[x]);
        }

        const filter = (reaction, user) => choices.includes(reaction.emoji.name) && user.id === message.author.id;
        const userChoice = (await msg.awaitReactions(filter, { max: 1 })).first().emoji.name;

        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        const result = getResult(userChoice, botChoice);

        await msg.reactions.removeAll();

        rpsEmbed
            .setTitle(result)
            .setDescription(`You chose ${userChoice}\n Bot chose ${botChoice}`);

        msg.edit(rpsEmbed);
    }
}

function getResult(p1, p2) {
    if ((p1 === "🗿" && p2 === "✂️") ||
        (p1 === "🧾" && p2 === "🗿") ||
        (p1 === "✂️" && p2 === "🧾")) {
            return "You won!";
        } else if (p1 === p2) {
            return "It's a tie!";
        } else {
            return "You lost!";
        }



  }