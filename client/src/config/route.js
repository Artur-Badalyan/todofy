const routes = {
  home: {
    path: '/',
    accessRoutes: ['superAdmin'],
  },
  login: {
    path: '/login',
    accessRoutes: ['superAdmin'],
  },
}

export default routes;