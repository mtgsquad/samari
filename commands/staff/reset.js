const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'reset',
    description: 'Reset the amount of sCoins a user has!',
    usage: '<@user>',
    run: async(client, message, args, profileData) => {
        if(!profileData.role === 'staff') return message.channel.send('Only **Staff** can run this command.')


        let resetUser = message.mentions.users.first();

        if(!resetUser) return message.channel.send('Mention Someone So I Can Reset Their Balance.')

        try{
            await profileModel.findOneAndUpdate(
                {
                    userID: resetUser.id,
                },
                {
                    $inc: {
                        sCoins: '500',
                    },
                }
            )
        }catch(err){
            console.log(err)
        }

        message.channel.send(`I successfully reset ${resetUser}'s Balance`);
    },
}