const express = require('express');
const app = express();
const port = 3000;

const ms = require('ms');

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, activity, mongodb } = require('./config.json');
const mongoose = require('mongoose');

const client = new Discord.Client({
	partials: ["MESSAGE", "REACTION", "CHANNEL"]
});

client.prefix = prefix;

// for the currency stuff
const profileModel = require('./models/profileSchema');
const { profile } = require('console');

// our beautiful custom server commands system
const customCommandModel = require('./models/customCommandSchema');

// Collections
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to mongoDB!');
}).catch((err) => {
    console.log(err)
})

client.once('ready', () => {
	console.log(`Logged In As ${client.user.tag}!`);
	client.user.setActivity(`${activity}`, { type: "LISTENING" });
});

client.on("message", async message => {
	  message.channel.messages.fetch();
   
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    let profileData;
    try{
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                sCoins: 500,
                bank: 0,
            });
        }
    }catch(err){
        console.log(err)
    }

    let customCmdData;
    try{
        customCmdData = await customCommandModel.findOne({ serverID: message.guild.id, commandName: message.content.slice(1) });
    }catch(err){
        console.log(err)
    }

    if(customCmdData && customCmdData.commandResponse) return message.channel.send(customCmdData.commandResponse);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args, profileData, customCmdData, Discord);
});

// giveaways
client.on('message', async message => {
	let args = message.content.substring(prefix.length).split(" ")

	if(message.member.permissions.has('MANAGE_MESSAGES')){
              if (message.content.startsWith(`${prefix}giveaway`)) {
                  let time = args[1]
                  if (!time) return message.channel.send('You did not specify a time!');
          
                  if (
                      !args[1].endsWith("d") &&
                      !args[1].endsWith("h") &&
                      !args[1].endsWith("m") &&
                      !args[1].endsWith("s") 
                  )
                      return message.channel.send('You need to use d (days), h (hours), m (minutes), or s (seconds)')
          
                      let gchannel = message.mentions.channels.first();
                      if (!gchannel) return message.channel.send("I can't find that channel in the server!")
          
                      let prize = args.slice(3).join(" ")
                      if (!prize) return message.channel.send('Arguement missing. What is the prize?')
          
                      message.delete()
                      gchannel.send(":tada: **NEW GIVEAWAY** :tada:")
                      let gembed = new Discord.MessageEmbed()
                          .setTitle("New Giveaway!")
                          .setDescription(`React with :tada: to enter the giveaway!\nHosted By: **${message.author}**\nTime: **${time}**\nPrize: **${prize}**`)
                          .setTimestamp(Date.now + ms(args[1]))
                          .setColor(3447003)
                      let n = await gchannel.send(gembed)
                      n.react("🎉")
                      setTimeout(() => {
                          if(n.reactions.cache.get("🎉").count <= 1) {
                              return message.channel.send("Not enough people for me to draw a winner!")
                          }
          
                          let winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                          gchannel.send(`Congratulations ${winner}! You just won the **${prize}**!`
                          );
                      }, ms(args[1]));
              }
            }
});

client.login(token);
app.get('/', (req, res) => {
    res.send('Keeping The Bot Alive Is Hard Work!')
});
  
app.listen(port, () => {
    console.log(`app listening at port 3000!`)
});