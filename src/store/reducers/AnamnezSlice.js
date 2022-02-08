import { createSlice } from "@reduxjs/toolkit";

const AnamnezSlice = createSlice({
    name: "AnamnezSlice",
    initialState: {
        questionBody : "",
        anamnezData  : {},
        selectedSpecialistID : 51,
        selectedSpecialtyID  : 6,
        userAbout : {},
        showRequiredFields: null,
    },
    reducers: {
        addAnamnezAnswer(state, action){
            state.anamnezData[action.payload.index] = action.payload.sh_field_type
        },
        addAnamnezPhoto(state, action){
            state.anamnezData[action.payload.index].file = action.payload.file
        },
        selectSpecialistID(state, action){
            state.selectedSpecialistID = action.payload
            console.log("Specialist id " + state.selectedSpecialistID)
        },
        selectSpecialtyID(state, action){
            state.selectedSpecialtyID = action.payload
            console.log("Specialty id " + state.selectedSpecialtyID)
        },
        showRequiredFields(state, action){
            state.showRequiredFields = action.payload
        },
        setQuestionBody(state, action){
            state.questionBody = action.payload
            console.log("Question Body " + state.questionBody)
        },
        resetAllValues(state, action){
            state.anamnezData = {};
            state.showRequiredFields = null;
        },

        setUAKey(state, action){
            state.userAbout[action.payload.index] = action.payload.body
            state.userAbout["gender"] = "ж"
            console.log("UA :: userAbout["+action.payload.index+"] = " + state.userAbout[action.payload.index])
        },
    }
})

export default AnamnezSlice.reducer
export const { addAnamnezAnswer, selectSpecialistID, selectSpecialtyID,
    showRequiredFields, setQuestionBody, resetAllValues,
    setUAKey } = AnamnezSlice.actions
