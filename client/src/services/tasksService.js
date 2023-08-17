import { get, post, put, del } from 'services/client';
// import { apiEndpoints } from 'config';

// import { apiEndpoints } from '../config/api-endpoints.json';
import { serverUrl, apiEndpoints } from '../config/index';


// export const fetchContent = createAsyncThunk(
//   'tasks/create',
//   async () => {
//     const options = { url: { serverUrl, apiEndpoints: { tasks } }, data };
//     const res = await post(options)
//     const data = await res.data
//     return data
//   }
// )


export default {
  getAllTasks: async (params) => {
    const options = { url: apiEndpoints.tasks, params: { ...params } };
     return get(options);
  },
  createTask: async (data) => {
    const options = { url: apiEndpoints.tasks, data };
    return post(options);
  },
  editTask: async (id, data) => {
    const options = { url: apiEndpoints.task.replace(':id', id) , data };
    return put(options);
  },
  deleteTask: async (id) => {
    const options = { url: apiEndpoints.task.replace(':id', id) };
    return del(options);
  },
  deleteAllTasks: async () => {
    const options = { url: apiEndpoints.tasks };
    return del(options);
  },
}