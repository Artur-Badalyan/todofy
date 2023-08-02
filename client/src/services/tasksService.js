import { get } from 'services/client';
import { apiEndpoints } from 'config';

export default {
  getAllTasks: async (params) => {
    const options = { url: apiEndpoints.tasks, params: {...params} };
    return get(options);
  },
  createTask: async (data) => {
    const options = { url: apiEndpoints.tasks, data };
    return post(options);
  }
}