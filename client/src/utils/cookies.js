import Cookies from 'universal-cookie';

const TOKEN_KEY = 'token';
const LOGIN_DATE = 'loginDate';

const cookies = new Cookies();

export const getLoginDate = () => cookies.get(LOGIN_DATE);

export const setLoginDate = (date) => cookies.set(LOGIN_DATE, date);

export const getToken = () => cookies.get(TOKEN_KEY);

export const setToken = (token) => cookies.set(TOKEN_KEY, token);

export const removeToken = () => cookies.remove(TOKEN_KEY);





