import { createSlice } from "@reduxjs/toolkit";

const AnamnezSlice = createSlice({
    name: "AnamnezSlice",
    initialState: {
        questionBody : "",
        anamnezData  : {},
        selectedSpecialistID : 51,
        selectedSpecialtyID  : 6,
        anonymous: false,
        userAbout : {},
        showRequiredFields: null,
    },
    reducers: {
        addAnamnezAnswer(state, action){
            if(state.anamnezData[action.payload.index]?.file) {
                // console.log("ЕСТЬ ФАЙЛ")
                let file = state.anamnezData[action.payload.index].file
                state.anamnezData[action.payload.index] = action.payload.sh_field_type
                state.anamnezData[action.payload.index].file = file
            } else {
                // console.log("НЕТ ФАЙЛА")
                state.anamnezData[action.payload.index] = action.payload.sh_field_type
            }
        },
        addAnamnezPhoto(state, action){
            state.anamnezData[action.payload.index].file = action.payload.file
            console.log("state.anamnezData["+action.payload.index+"]::" + JSON.stringify(state.anamnezData[action.payload.index]))
        },
        deleteAnamnezPhoto(state, action){
            state.anamnezData[action.payload.index].file = ""
        },
        selectSpecialistID(state, action){
            state.selectedSpecialistID = action.payload
            console.log("Specialist id:: " + state.selectedSpecialistID)
        },
        selectSpecialtyID(state, action){
            state.selectedSpecialtyID = action.payload
            console.log("Specialty id:: " + state.selectedSpecialtyID)
        },
        selectAnonymous(state, action){
            state.anonymous = action.payload
            console.log("anonymous:: " + state.anonymous)
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
export const { addAnamnezAnswer, addAnamnezPhoto, selectSpecialistID, selectSpecialtyID,
    showRequiredFields, setQuestionBody, resetAllValues, selectAnonymous,
    setUAKey } = AnamnezSlice.actions
