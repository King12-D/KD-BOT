const { antiLinkEnabled, mutedUsers } = require('../bot');

const moderationCommands = {
    antilink: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const authorId = message.author || message.from;
            const isAdmin = chat.participants.find(p => p.id._serialized === authorId)?.isAdmin;
            
            if (isAdmin) {
                if (args[0] === 'on') {
                    antiLinkEnabled = true;
                    await message.reply('Anti-link feature has been enabled.');
                } else if (args[0] === 'off') {
                    antiLinkEnabled = false;
                    await message.reply('Anti-link feature has been disabled.');
                } else {
                    await message.reply('Usage: !antilink [on/off]');
                }
            } else {
                await message.reply('You need to be an admin to use this command.');
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    mute: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const authorId = message.author || message.from;
            const isAdmin = chat.participants.find(p => p.id._serialized === authorId)?.isAdmin;
            
            if (isAdmin) {
                const mentions = await message.getMentions();
                if (mentions.length > 0) {
                    const mutedUser = mentions[0].id._serialized;
                    mutedUsers.add(mutedUser);
                    await message.reply(`User ${mentions[0].pushname || mentions[0].number} has been muted.`);
                } else {
                    await message.reply('Please mention the user you want to mute.');
                }
            } else {
                await message.reply('You need to be an admin to use this command.');
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    unmute: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const authorId = message.author || message.from;
            const isAdmin = chat.participants.find(p => p.id._serialized === authorId)?.isAdmin;
            
            if (isAdmin) {
                const mentions = await message.getMentions();
                if (mentions.length > 0) {
                    const unmutedUser = mentions[0].id._serialized;
                    mutedUsers.delete(unmutedUser);
                    await message.reply(`User ${mentions[0].pushname || mentions[0].number} has been unmuted.`);
                } else {
                    await message.reply('Please mention the user you want to unmute.');
                }
            } else {
                await message.reply('You need to be an admin to use this command.');
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },
};

module.exports = moderationCommands;

