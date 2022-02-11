import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showRequiredFields } from '../../store/reducers/AnamnezSlice';
import Request from '../../requests/Request';
import baseApiURL from "../../requests/baseApiURL";
import {useNavigation} from "@react-navigation/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { MultiPlatform } from '../MultiPlatform';

const SendButtonBase = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const questionBody         = useSelector(state => state.AnamnezSlice.questionBody)
    const anamnezData          = useSelector(state => state.AnamnezSlice.anamnezData)
    const selectedSpecialistID = useSelector(state => state.AnamnezSlice.selectedSpecialistID)
    const selectedSpecialtyID  = useSelector(state => state.AnamnezSlice.selectedSpecialtyID)
    const userAbout            = useSelector(state => state.AnamnezSlice.userAbout)

    const checkRequiredFields = () => {
        const keys = Object.keys(anamnezData)

        for (let i = 0; i < keys.length; i++){
            let value = anamnezData[keys[i]]
            if ((value.choices && value.choices.length == 0 && value.isRequired) || 
                (value.val == "" && value.isRequired)){
                dispatch(showRequiredFields(true))
                return true
            }
        }
        return false
    }

    const sendData = async () => {
        if(!checkRequiredFields()){
            let sendQuestionData
            console.log("All fields is complete")

            if(userAbout["first_name"] && userAbout["second_name"] && userAbout["middle_name"] && userAbout["gender"]) {
                console.log("для близкого")
                sendQuestionData = {
                    q_body: questionBody,
                    qsh_anamnes: JSON.stringify(anamnezData),
                    q_specialist_id: selectedSpecialistID,
                    q_specialty_id: selectedSpecialtyID,
                    user_about : JSON.stringify(userAbout)
                }
            } else{
                console.log("для себя любимого")
                sendQuestionData = {
                    q_body: questionBody,
                    qsh_anamnes: JSON.stringify(anamnezData),
                    q_specialist_id: selectedSpecialistID,
                    q_specialty_id: selectedSpecialtyID,
                }
            }

            let request = await Request.post(baseApiURL + "Ask_question", sendQuestionData);
            if(request){
                if(request["response"]){
                    console.log(request["response"])
                    navigation.navigate("MainScreen")
                } else {
                    console.log(request["error"])
                }
            } else {
                console.log("Что-то пошло не так...")
            }
        } else {
            console.log("Missed fields")
        }
    }

    return(
        <TouchableOpacity onPress={() => sendData()} style={ styles.buttonStyle }>
            <Text style={{
                color: '#FFFFFF',
                fontSize: MultiPlatform.AdaptivePixelsSize(17)
            }}>
                Задать вопрос
            </Text>
         </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: '100%',
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: '#58BE3F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10
    }
})

export default SendButtonBase;
