import { createSlice, } from "@reduxjs/toolkit";

const defaultUser = {
    id: "1",
    firstName: "Alex",
    lastName: "Smith",
    telegramCode: "",
    telegramId: "",
    chatId: "",
    isTelegramActive: false
}

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : defaultUser
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // addNewTask(state, action) {
        //     state.tasks = [action.payload, ...state.tasks];
        // },
        // removeTask(state, action) {
        //     const newTasksList = state.tasks.filter((task) => task.id !== action.payload);
        //     state.tasks = newTasksList;
        // },
        // markAsImportant(state, action) {
        //     const newTaskFavorited = state.tasks.find((task) => task.id === action.payload);
        //     newTaskFavorited.important = !newTaskFavorited.important;
        // },
        editUser(state, action) {
            state.user = {
                ...state.user,
                ...action.payload
            };
        },
        // toggleTaskCompleted(state, action) {
        //     const taskId = action.payload;
        //     const currTask = state.tasks.find((task) => task.id === taskId);
        //     currTask.completed = !currTask.completed;
        // },


    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
export const userMiddleware = (store) => (next) => (action) => {
    const nextAction = next(action);

    if (action.type.startsWith("user/")) {
        const user = store.getState().user.user;
        localStorage.setItem("user", JSON.stringify(user));
    } else if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(defaultUser));
    }

 
    return nextAction;
};
