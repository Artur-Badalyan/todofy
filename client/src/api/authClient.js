// import axios from 'axios';
// // import { checkToken, getCookie, logOut } from '../utils/helpers';
// // import { COOKIE_KEYS, UNAUTHORIZED_STATUS } from '../utils/constants';

// export const COOKIE_KEYS = {
//   AUTH_TOKEN: AUTH_COOKIE_NAME,
// };

// export const UNAUTHORIZED_STATUS = 401;

// const axiosAuth = axios.create({});

// axiosAuth.interceptors.request.use((config) => {
//   const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
//   checkToken(token);

//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// axiosAuth.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === UNAUTHORIZED_STATUS) logOut();
//     throw error;
//   },
// );

// export default axiosAuth;
