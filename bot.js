const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { OWNER_NAME } = require('./config');
const commands = require('./commands');
const { handleAntiLink, handleMutedUser } = require('./messageHandlers');

let antiLinkEnabled = false;
let mutedUsers = new Set();

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    if (message.body.startsWith('!')) {
        const [command, ...args] = message.body.slice(1).split(' ');
        if (commands[command]) {
            try {
                await commands[command](client, message, args);
            } catch (error) {
                console.error(`Error executing command ${command}:`, error);
                message.reply('An error occurred while executing the command.');
            }
        } else {
            message.reply('Unknown command. Type !help for a list of commands.');
        }
    }
});

client.on('message', async (message) => {
    if (message.isGroup) {
        const chat = await message.getChat();
        const sender = await message.getContact();
        const isAdmin = chat.participants.find(p => p.id._serialized === sender.id._serialized)?.isAdmin;

        await handleAntiLink(message, chat, sender, isAdmin, antiLinkEnabled);
        await handleMutedUser(message, sender, isAdmin, mutedUsers);
    }
});

client.initialize();

module.exports = { client, antiLinkEnabled, mutedUsers };

