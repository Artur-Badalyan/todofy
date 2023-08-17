import { get } from 'services/client';
import { apiEndpoints } from 'config';

export default {
  getUsers: async (params) => {
    const options = { url: apiEndpoints.users, params: {...params} };
    return get(options);
  },
  getUser: async (id) => {
    const options = { url: apiEndpoints.user.replace(':id', id)};
    return get(options);
  },
  login: async (params) => {
    const options = { url: apiEndpoints.login, params: {...params} };
    return get(options);
  },
  logout: async (params) => {
    const options = { url: apiEndpoints.login, params: {...params} };
    return get(options);
  },
  registrate: async (params) => {
    const options = { url: apiEndpoints.login, params: {...params} };
    return get(options);
  }
}
