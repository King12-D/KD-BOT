const tags = new Map();

const tagManagementCommands = {
    createtag: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const [tagName, ...tagContent] = args;
            
            if (!tagName || tagContent.length === 0) {
                await message.reply('Usage: !createtag <tagname> <tag content>');
                return;
            }

            const tagContentString = tagContent.join(' ');
            
            if (tags.has(tagName)) {
                await message.reply(`Tag "${tagName}" already exists. Use !updatetag to modify it.`);
            } else {
                tags.set(tagName, tagContentString);
                await message.reply(`Tag "${tagName}" created successfully.`);
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    updatetag: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const [tagName, ...tagContent] = args;
            
            if (!tagName || tagContent.length === 0) {
                await message.reply('Usage: !updatetag <tagname> <new tag content>');
                return;
            }

            const tagContentString = tagContent.join(' ');
            
            if (tags.has(tagName)) {
                tags.set(tagName, tagContentString);
                await message.reply(`Tag "${tagName}" updated successfully.`);
            } else {
                await message.reply(`Tag "${tagName}" doesn't exist. Use !createtag to create a new tag.`);
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    deletetag: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const [tagName] = args;
            
            if (!tagName) {
                await message.reply('Usage: !deletetag <tagname>');
                return;
            }
            
            if (tags.has(tagName)) {
                tags.delete(tagName);
                await message.reply(`Tag "${tagName}" deleted successfully.`);
            } else {
                await message.reply(`Tag "${tagName}" doesn't exist.`);
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    tag: async (client, message, args) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            const [tagName] = args;
            
            if (!tagName) {
                await message.reply('Usage: !tag <tagname>');
                return;
            }
            
            if (tags.has(tagName)) {
                const tagContent = tags.get(tagName);
                await message.reply(`${tagName}: ${tagContent}`);
            } else {
                await message.reply(`Tag "${tagName}" doesn't exist.`);
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },

    listtags: async (client, message) => {
        if (message.isGroup) {
            const chat = await message.getChat();
            
            if (tags.size > 0) {
                const tagList = Array.from(tags.keys()).join(', ');
                await message.reply(`Available tags: ${tagList}`);
            } else {
                await message.reply('No tags have been created yet.');
            }
        } else {
            await message.reply('This command can only be used in a group.');
        }
    },
};

module.exports = tagManagementCommands;

