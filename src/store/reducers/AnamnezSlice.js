import { createSlice } from "@reduxjs/toolkit";

const AnamnezSlice = createSlice({
    name: "AnamnezSlice",
    initialState: {
        anamnezData: {},
        selectedSpecialistID: 10,
        showRequiredFields: null,
    },
    reducers: {
        addAnamnezAnswer(state, action){
            state.anamnezData[action.payload.index] = action.payload.sh_field_type
        },
        selectSpecialistID(state, action){
            state.selectedSpecialistID = action.payload
        },
        showRequiredFields(state, action){
            state.showRequiredFields = action.payload
        },
        resetAllValues(state, action){
            state.anamnezData = {};
            state.showRequiredFields = null;
        },
    }
})

export default AnamnezSlice.reducer
export const { addAnamnezAnswer, selectSpecialistID, 
    showRequiredFields, resetAllValues } = AnamnezSlice.actions