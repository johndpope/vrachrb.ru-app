import { createSlice } from "@reduxjs/toolkit";

const AnamnezSlice = createSlice({
    name: "AnamnezSlice",
    initialState: {
        text: [],
        clicked: false,
        anamnezData: []
    },
    reducers: {
        clickOnButton(state, action){
            state.clicked = action.payload
        },
        changeTextData(state, action){
            state.text[action.payload.index] ? 
                state.text[action.payload.index] = action.payload.sh_field_type : 
                state.text.push(action.payload.sh_field_type)
        },
        addAnamnezAnswer(state, action){
            state.anamnezData[action.payload.index] ? 
                state.anamnezData[action.payload.index] = action.payload.sh_field_type : 
                state.anamnezData.push(action.payload.sh_field_type)
        }
    }
})

export default AnamnezSlice.reducer
export const { changeTextData, clickOnButton } = AnamnezSlice.actions