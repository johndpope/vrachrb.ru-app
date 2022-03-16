import { createSlice } from "@reduxjs/toolkit";
import Storage from "../../storage/Storage";

const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState: {
        userData: {
            auth: false,
            isSpecialist: false,
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
        agreements: []
    },
    reducers: {
        saveUserData(state, action){
            state.userData = action.payload
        },
        setAgreements(state, action){
            state.agreements = action.payload
        },
        resetUserData(state){
            state.userData = {
                auth: false,
                isSpecialist: false,
                first_name: "",
                second_name: "",
                middle_name: "",
                username: "",
                gender: "",
                birth_date: "",
                email: "",
                phone: "",
                photo: ""
            }
        }
    }
})

export default LoginSlice.reducer
export const { saveUserData, setAgreements, resetUserData } = LoginSlice.actions