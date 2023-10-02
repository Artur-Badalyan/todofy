import { makePostRequest } from "helper/helper";
import constants from "./constants";

const sendNotification = async (chat_id, text, parse_mode) => {
    const endpoint = `https://api.telegram.org/bot${constants.TELEGRAM_BOT_TOKEN}/sendMessage`;
    await makePostRequest(endpoint,
        {
            text,
            parse_mode,
            chat_id
        });
};

const removeUserTelegram = async (chat_id, user_id) => {
    const endpoint = `https://api.telegram.org/bot${constants.TELEGRAM_BOT_TOKEN}/kickChatMember`;
    const x = await makePostRequest(endpoint,
        {
            chat_id,
            user_id: chat_id
        });

    console.log('remove response = !!!!!!! = ',x)
}

const getBotUpdates = () => fetch(
    `https://api.telegram.org/bot${constants.TELEGRAM_BOT_TOKEN}/getUpdates`
).then((response) => response.json());

const getUserTelegramId = async (uniqueString) => {
    const { result } = await getBotUpdates();

    const messageUpdates = result.filter(
        ({ message }) => message?.text !== undefined
    );
    console.log('messageUpdates = ',messageUpdates)
    console.log('uniqueString = ',uniqueString)

    const userUpdate = messageUpdates.find(({ message }) => message.text === `/start ${uniqueString}`);
    console.log('userUpdate = ',userUpdate)

    if (userUpdate) {
        const msg = userUpdate.message;

        await sendNotification(chatId, 'successfully registered');
        return { telegramId: userUpdate.message.from.id, chatId:  msg.chat.id }
    }

    return null;
};

const getUserTelegramPreferences = async () => {
    try {
        const currUser = JSON.parse(localStorage.getItem('user'));
        let newUser = {...currUser};

        if (!newUser.telegramCode) {
            const generateRandomString = () => {
                const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
                let randomString = '';
                for (let i = 0; i < 64; i++) {
                    const randomIndex = Math.floor(Math.random() * allowedChars.length);
                    randomString += allowedChars[randomIndex];
                }

                return randomString;
            };
            newUser.telegramCode = generateRandomString();
            const result = await getUserTelegramId(newUser.telegramCode);
            console.log('result = ',result)
            if (result) {
                newUser.telegramId = result.telegramId;
                newUser.chatId = result.chatId;
            }
        } else {
            await sendNotification(newUser.chatId, 'Something went wrong');
        }

        return newUser;
    } catch (err) {
        console.log('err = ',err)
        console.error(err, 'telegram::getUserTelegramPreferences');
    }
};

export {
    getUserTelegramPreferences,
    removeUserTelegram
};