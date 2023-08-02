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
  }
}