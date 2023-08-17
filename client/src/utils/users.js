// import { Buffer } from 'buffer';
// import moment from 'moment';
// import {
//   COOKIE_KEYS,
//   INTERNAL_PREFIX,
//   MIN_ROW_COUNT,
//   PRESALES_POSTFIX,
//   ROW_HEIGHT,
// } from './constants';

// export const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };

// export const processURIString = (name = '') =>
//   encodeURIComponent(name.toLowerCase().trim());

// const toBinary = (text) => {
//   return Buffer.from(text, 'base64').toString('binary');
// };

// export const parseJwt = (token) => {
//   const base64Url = token.split('.')[1];
//   if (!base64Url) return null;
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(
//     toBinary(base64)
//       .split('')
//       .map((c) => {
//         const symbol = `00${c.charCodeAt(0).toString(16)}`.slice(-2);
//         return `%${symbol}`;
//       })
//       .join(''),
//   );
//   return JSON.parse(jsonPayload);
// };

// export const deleteCookie = (name, path = '', domain = '') => {
//   if (getCookie(name)) {
//     document.cookie = `${name}=${path ? `;path=${path}` : ''}${
//       domain ? `;domain=${domain}` : ''
//     };expires=Thu, 01 Jan 1970 00:00:01 GMT`;
//   }
// };

// export const deleteAuthCookie = () => {
//   const domainOrigin = window?.location?.origin?.includes('zealous.tech')
//     ? '.zealous.tech'
//     : '';
//   deleteCookie(COOKIE_KEYS.AUTH_TOKEN, '/', domainOrigin);
// };

// export const logOut = () => {
//   deleteAuthCookie();
//   location.reload();
// };

// export const checkToken = (token) => {
//   const dataPart = token.split('.')[1];
//   if (!token || !dataPart) logOut();

//   const decodedJwt = JSON.parse(atob(dataPart));
//   if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) logOut();
// };

// export const checkAuthCookie = () => {
//   const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
//   if (!token) return null;
//   const { email, exp: expInSec } = parseJwt(token) || {};
//   if (!expInSec || moment().isAfter(expInSec * 1000)) {
//     // eslint-disable-next-line no-console
//     console.log('Auth cookie is expired or invalid.');
//     return null;
//   }
//   return email;
// };

// export const getClientRolesFromAuthCookie = () => {
//   const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
//   if (!token) return [];
//   const { client_role: roles = '', exp: expInSec } = parseJwt(token) || {};
//   if (!expInSec || moment().isAfter(expInSec * 1000)) {
//     // eslint-disable-next-line no-console
//     console.log('Auth cookie is expired or invalid.');
//     return [];
//   }
//   return roles.split(',');
// };
 

 
// export const setCookie = (name, value) => {
//   document.cookie = `${name}=${value}`;
// };
 