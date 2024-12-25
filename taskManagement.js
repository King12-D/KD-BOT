const tasks = [];

const taskManagementCommands = {
    addtask: async (client, message, args) => {
        const task = args.join(' ');
        if (task) {
            tasks.push({ id: tasks.length + 1, task, completed: false });
            await message.reply(`Task added: ${task}`);
        } else {
            await message.reply('Please provide a task description.');
        }
    },

    tasks: async (client, message) => {
        if (tasks.length > 0) {
            const taskList = tasks.map(t => `${t.id}. [${t.completed ? 'x' : ' '}] ${t.task}`).join('\n');
            await message.reply(`Tasks:\n${taskList}`);
        } else {
            await message.reply('No tasks found.');
        }
    },

    completetask: async (client, message, args) => {
        const taskId = parseInt(args[0]);
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            await message.reply(`Task ${taskId} marked as complete.`);
        } else {
            await message.reply('Task not found.');
        }
    },
};

module.exports = taskManagementCommands;

