const customCommandModel = require('../../models/customCommandSchema');

module.exports = {
    name: 'create-cmd',
    description: 'Create server-only commands',
    aliases: ['create-command', 'newcommand', 'addcmd'],
    run: async(client, message, args, customCmdData) => {
        
        let msg = message;

        let newCommandName = args[0];
        let newCommandResponse = args.slice(1).join(' ');

        if(!newCommandName) return msg.channel.send('Please Specify A Command Name!');
        if(!newCommandResponse) return msg.channel.send(`Please Specify A Message That The !${newCommandName} Will Respond With! *You can include links for images to send any images that you want.*`)

        try{
            await customCommandModel.create(
                {
                    serverID: message.guild.id,
                    commandName: newCommandName,
                    commandResponse: newCommandResponse
                }
            ).then(
                message.channel.send(`I Successfully Created A Command Called: ${newCommandName}, And It Responds With: ${newCommandResponse}!`)
            );
        }catch(err){
            console.log(err)
        }
    }
}