import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { tasksMiddleware } from "./Tasks.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";
import userReducer, { userMiddleware } from "./User.store"

const store = configureStore({
    reducer: { user: userReducer, tasks: tasksReducer, modal: modalReducer, menu: menuReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksMiddleware).concat(userMiddleware)
});

export default store;
