import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState: {
        userData: {
            auth: false,
            first_name: "",
            second_name: "",
            middle_name: "",
            username: "",
            gender: "",
            birth_date: "",
            email: "",
            phone: "",
            photo: ""
        },
        test: null
    },
    reducers: {
        saveUserData(state, action){
            state.userData = action.payload
        }
    }
})

export default LoginSlice.reducer
export const { saveUserData } = LoginSlice.actions