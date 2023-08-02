import routes from './route';
import serverConfig from './server-config.json';
import apiEndpoints from './api-endpoints.json';

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? document.location.origin
    : `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}`;

export { routes, serverUrl, apiEndpoints };