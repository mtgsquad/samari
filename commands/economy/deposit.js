const profileModel = require("../../models/profileSchema");
module.exports = {
    name: "deposit",
    aliases: ["dep"],
    permissions: [],
    description: "Deposit sCoins into your bank!",
    run: async(client, message, args, profileData) => {
        const amount = args[0];
        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
        try {
            if (amount > profileData.sCoins) return message.channel.send(`You don't have that amount of sCoins to deposit`);
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        sCoins: -amount,
                        bank: amount,
                    },
                }
            );

            return message.channel.send(`You deposited ${amount} sCoins into your bank`);
        } catch (err) {
            console.log(err);
        }
    },
};