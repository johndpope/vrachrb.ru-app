import { createSlice } from "@reduxjs/toolkit";

const AnamnezSlice = createSlice({
    name: "AnamnezSlice",
    initialState: {
        clicked: false,
        anamnezData: {},
        selectedSpecialistID: 10,
        showRequiredFields: null,
        countRequiredFields: {}
    },
    reducers: {
        clickOnButton(state, action){
            state.clicked = action.payload
        },
        addAnamnezAnswer(state, action){
            state.anamnezData[action.payload.index] = action.payload.sh_field_type
        },
        selectSpecialistID(state, action){
            state.selectedSpecialistID = action.payload
        },
        showRequiredFields(state, action){
            state.showRequiredFields = action.payload
        },
        numOfRequiredFields(state, action){
            state.countRequiredFields[action.payload.index] = action.payload.value
        },
        resetAllValues(state, action){
            state.anamnezData = {};
            state.showRequiredFields = null;
            state.countRequiredFields = {};
        }
    }
})

export default AnamnezSlice.reducer
export const { addAnamnezAnswer, clickOnButton, selectSpecialistID, 
    showRequiredFields, numOfRequiredFields, resetAllValues } = AnamnezSlice.actions