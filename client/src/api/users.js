import axios from 'axios';
// import { AUTH_API } from '../utils/constants';

export const login = ({ username, password }) =>
  axios
    .post({ username, password }, { withCredentials: true })
    .then((res) => res.data);

export const myInfo = () =>
  axios.get().then((res) => res.data);