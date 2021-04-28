const profileModel = require("../../models/profileSchema");
module.exports = {
    name: "give",
    aliases: [],
    description: "Give a user some sCoins",
    run: async(client, message, args, profileData) => {
        if(!profileData.role === 'staff') return message.channel.send('Only **Staff** can run this command.')
        if (!args.length) return message.channel.send("You need to mention a user to give them sCoins");
        const amount = args[1];
        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist");

        if (amount % 1 != 0 || amount <= 0) return message.channel.send("The amount you are giving must be a whole number");

        try {
            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.channel.send(`This user doens't exist in the db`);

            await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                },
                {
                    $inc: {
                        sCoins: amount,
                    },
                }
            );

            return message.channel.send(`This user has been given their sCoins! You gave them ${amount} sCoins!`);
        } catch (err) {
            console.log(err);
        }
    },
};