import { createSlice } from "@reduxjs/toolkit";
import Routes from "../../requests/Routes";

const UtilitySlice = createSlice({
    name: "UtilitySlice",
    initialState: {
        bottomNavigationEnd: false
    },
    reducers: {
        setBottomNavigationEnd(state, action){
            state.bottomNavigationEnd = action.payload
        }
    }
})

export default UtilitySlice.reducer
export const { setBottomNavigationEnd } = UtilitySlice.actions