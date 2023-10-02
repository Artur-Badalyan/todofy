import path from 'path';
import telegramBot from 'services/telegramBot';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramBotName = process.env.TELEGRAM_BOT_NAME;

const checkTaskDate = async () => {
    try {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        const currentTime = new Date();
        tasks.filter(item => !item.completed && !item.alerted && new Date(item.date) < new Date());

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            
            await telegramBot.sendPreorderMessage(chatIds, body);
        }
    } catch (err) {
        console.err(err)
    }


};

if (localStorage.getItem("tasks")) {
    const savedTasksList = JSON.parse(localStorage.getItem("tasks"));
    let dirNotSaved = [];
    savedTasksList.forEach((task) => {
        if (!dirList.includes(task.dir)) {
            if (!dirNotSaved.includes(task.dir)) {
                dirNotSaved.push(task.dir);
            }
        }
    });
    dirList = [...dirList, ...dirNotSaved];
}

telegramBot.init(telegramBotToken);
setInterval(checkTaskDate, 5000);