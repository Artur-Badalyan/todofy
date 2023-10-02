import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { userActions } from "store/User.store";

import constants from "helper/constants";
import { getUserTelegramPreferences, removeUserTelegram } from "helper/telegram"



const Telegram = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [error, setError] = useState(false);
  const [telegramCode, setTelegramCode] = useState(null);
  const telegramBotName = constants.TELEGRAM_BOT_NAME;

  const initializeTelegramData = useCallback(async () => {
    try {
      setError(false);
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.isTelegramActive) {
        const newUser = await getUserTelegramPreferences();
        dispatch(userActions.editUser(newUser));
        setTelegramCode(user.telegramCode);
      }
      console.log(' user = ',user)

    } catch (err) {
      setError(true);
    }
  }, [])

  useEffect(() => {
      initializeTelegramData();
    }, [initializeTelegramData])

  const handleConnectToTelegram = () => {
      getUserTelegramPreferences();
  };

  const handleRemoveToTelegram = async () => {
    console.log('user=  ',user)
    // chatid 683253906
    // fromId 683253906
    await removeUserTelegram(683253906);
  };

  return (
    (
      !user.telegramCode ? 
        <a href={`https://t.me/${telegramBotName}?start=${telegramCode}`} target='_blank' rel="noreferrer">
            <button onClick={handleConnectToTelegram} class="mt-auto flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:brightness-110 hover:animate-pulse active:animate-bounce">
                <svg className="mr-2 h-4 w-4 flex-no-shrink fill-current" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                </svg>
                Connect to Telegram
            </button>
        </a>
        :
        <button onClick={handleRemoveToTelegram} class="mt-auto flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:brightness-110 hover:animate-pulse active:animate-bounce">
            <svg className="mr-2 h-4 w-4 flex-no-shrink fill-current" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
            </svg>
            Remove Telegram
        </button>
    )
  );
};
export default Telegram;
