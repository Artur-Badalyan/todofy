import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { tasksMiddleware } from "./Tasks.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";
import userReducer from "./User.store";

const store = configureStore({
    reducer: { tasks: tasksReducer, modal: modalReducer, menu: menuReducer,  user: userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksMiddleware),
});

export default store;
