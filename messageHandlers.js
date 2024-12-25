async function handleAntiLink(message, chat, sender, isAdmin, antiLinkEnabled) {
    if (antiLinkEnabled && !isAdmin && message.body.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
        await message.delete(true);
        await chat.sendMessage(`@${sender.id.user} your message was deleted because it contained a link.`, {
            mentions: [sender]
        });
    }
}

async function handleMutedUser(message, sender, isAdmin, mutedUsers) {
    if (mutedUsers.has(sender.id._serialized) && !isAdmin) {
        await message.delete(true);
    }
}

module.exports = {
    handleAntiLink,
    handleMutedUser
};

