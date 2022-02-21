import { createSlice } from "@reduxjs/toolkit";
import Routes from "../../requests/Routes";

const SpecSlice = createSlice({
    name: "SpecSlice",
    initialState: {
        specialistRoute: Routes.getSpecialistsURL,
        specialistData: {}
    },
    reducers: {
        setSpecialistRoute(state, action){
            state.specialistRoute = action.payload
        },
        setSpecialistData(state, action){
            state.specialistData = action.payload
        },
    }
})

export default SpecSlice.reducer
export const { setSpecialistRoute, setSpecialistData } = SpecSlice.actions