module.exports = {
    name: 'addstaff',
    description: 'Add staff?',
    run: async(client, message, args) => {
        if(!profileData.role === 'staff'){
            message.channel.send('Only **Staff** can run this command.')
        }

        let target = message.mentions.users.first();
        if(!target){
            message.channel.send('Mention Someone To Give The Staff Role To.')
        }

        try{
            await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                },
                {
                    $set: {
                        role: 'staff',
                    },
                }
            )
        }catch(err){
            console.log(err)
        }
    }
}