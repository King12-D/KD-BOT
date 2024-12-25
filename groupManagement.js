const groupManagementCommands = {
    info: async (client, message) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const info = `
Group Name: ${chat.name}
Group Description: ${chat.description}
Participant count: ${chat.participants.length}
Created At: ${chat.createdAt.toString()}
Created By: ${chat.owner.user}
Bot Owner: ${OWNER_NAME}
            `;
            await message.reply(info);
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    members: async (client, message) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            let memberList = 'Group Members:\n';
            for (let participant of chat.participants) {
                const contact = await client.getContactById(participant.id._serialized);
                memberList += `- ${contact.pushname || contact.name || participant.id.user}\n`;
            }
            await message.reply(memberList);
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    kick: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            if (chat.isGroup) {
                const authorId = message.author || message.from;
                const isAdmin = chat.participants.find(p => p.id._serialized === authorId)?.isAdmin;
                if (isAdmin) {
                    const mentions = await message.getMentions();
                    if (mentions.length > 0) {
                        await chat.removeParticipants([mentions[0].id._serialized]);
                        await message.reply(`User ${mentions[0].pushname || mentions[0].number} has been kicked.`);
                    } else {
                        await message.reply('Please mention the user you want to kick.');
                    }
                } else {
                    await message.reply('You need to be an admin to use this command.');
                }
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    promote: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const authorId = message.author || message.from;
            const isAdmin = chat.participants.find(p => p.id._serialized === authorId)?.isAdmin;
            if (isAdmin) {
                const mentions = await message.getMentions();
                if (mentions.length > 0) {
                    await chat.promoteParticipants([mentions[0].id._serialized]);
                    await message.reply(`User ${mentions[0].pushname || mentions[0].number} has been promoted to admin.`);
                } else {
                    await message.reply('Please mention the user you want to promote.');
                }
            } else {
                await message.reply('You need to be an admin to use this command.');
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    demote: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const authorId = message.author || message.from;
            const isAdmin = chat.participants.find(p => p.id._serialized === authorId)?.isAdmin;
            if (isAdmin) {
                const mentions = await message.getMentions();
                if (mentions.length > 0) {
                    await chat.demoteParticipants([mentions[0].id._serialized]);
                    await message.reply(`User ${mentions[0].pushname || mentions[0].number} has been demoted from admin.`);
                } else {
                    await message.reply('Please mention the user you want to demote.');
                }
            } else {
                await message.reply('You need to be an admin to use this command.');
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    tagall: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            let text = args.join(' ');
            let mentions = [];

            for (let participant of chat.participants) {
                mentions.push(`@${participant.id.user}`);
            }

            await chat.sendMessage(`${text}\n\n${mentions.join(' ')}`, {
                mentions: chat.participants
            });
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },
};

module.exports = groupManagementCommands;

