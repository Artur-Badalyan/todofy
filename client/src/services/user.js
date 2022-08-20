import { get, post, put } from 'services/client';
import {apiEndpoints, HEADERS} from "configs/index";

export default {
  login: async (data) => {
    const options = { url: `${apiEndpoints.login}`, data };
    return post(options);
  },
  signup: async (data) => {
    const options = { url: `${apiEndpoints.signup}`, data };
    return post(options);
  }
}
