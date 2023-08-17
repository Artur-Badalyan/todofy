import { createSlice } from "@reduxjs/toolkit";
import user from '../services/usersService';

const initialState = {
    userName: '',
    token: '',
    isLogin: false

};


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login(state, action) {
            state = action.payload

        },
        logout(state, action) {
            const res = user.logout(action.payload);
            dispatch({ payload: res });
        }
    },
});

export const userActions = user.actions;
export default userSlice.reducer;
