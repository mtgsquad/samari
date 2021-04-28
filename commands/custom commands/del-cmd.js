const customCommandModel = require('../../models/customCommandSchema');

module.exports = {
    name: 'del-cmd',
    description: 'Delete a custom command.',
    aliases: ['delete-command', 'delcommand', 'delcmd', 'rmcmd'],
    run: async(client, message, args, customCmdData) => {
        let msg = message;

        let delCommandName = args[0];

        if(!delCommandName) return msg.channel.send('Please Specify A Command Name!');
        
        try{
            await customCommandModel.findOneAndDelete(
                {
                    serverID: message.guild.id,
                    commandName: delCommandName
                }
            ).then(
                message.channel.send(`I Successfully Deleted A Command Called: ${delCommandName}!`)
            );
        }catch(err){
            console.log(err)
        }
    } 
}