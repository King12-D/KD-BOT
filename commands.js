const { OWNER_NAME } = require('./config');
const groupManagementCommands = require('./commands/groupManagement');
const taskManagementCommands = require('./commands/taskManagement');
const moderationCommands = require('./commands/moderation');
const tagManagementCommands = require('./commands/tagManagement');

const commands = {
    help: async (client, message) => {
        const helpText = `
Available commands:
!help - Show this help message
!info - Get group info
!members - List group members
!kick @user - Kick a user from the group
!promote @user - Promote a user to admin
!demote @user - Demote an admin to regular user
!addtask [task] - Add a new task
!tasks - List all tasks
!completetask [taskId] - Mark a task as complete
!antilink [on/off] - Enable or disable anti-link feature (admin only)
!mute @user - Mute a user (admin only)
!unmute @user - Unmute a user (admin only)
!createtag <tagname> <content> - Create a new tag
!updatetag <tagname> <new content> - Update an existing tag
!deletetag <tagname> - Delete a tag
!tag <tagname> - Display the content of a tag
!listtags - List all available tags
!owner - Display the owner's name

Bot Owner: ${OWNER_NAME}
        `;
        await message.reply(helpText);
    },
    owner: async (client, message) => {
        await message.reply(`The owner of this bot is ${OWNER_NAME}.`);
    },
    ...groupManagementCommands,
    ...taskManagementCommands,
    ...moderationCommands,
    ...tagManagementCommands,
};

module.exports = commands;

