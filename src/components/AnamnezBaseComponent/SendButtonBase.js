import React, {useState} from 'react';
import { Alert, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showRequiredFields } from '../../store/reducers/AnamnezSlice';
import Request from '../../requests/Request';
import baseApiURL from "../../requests/baseApiURL";
import {useNavigation} from "@react-navigation/native";
import {MultiPlatform} from "../MultiPlatform";
import baseURL from "../../requests/baseURL";

const SendButtonBase = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    const questionBody = useSelector(state => state.AnamnezSlice.questionBody)
    const anamnezData = useSelector(state => state.AnamnezSlice.anamnezData)
    const selectedSpecialistID = useSelector(state => state.AnamnezSlice.selectedSpecialistID)
    const selectedSpecialtyID = useSelector(state => state.AnamnezSlice.selectedSpecialtyID)
    const userAbout = useSelector(state => state.AnamnezSlice.userAbout)

    const checkRequiredFields = () => {
        const keys = Object.keys(anamnezData)

        for (let i = 0; i < keys.length; i++) {
            let value = anamnezData[keys[i]]
            if ((value.choices && value.choices.length == 0 && value.isRequired) ||
                (value.val == "" && value.isRequired)) {
                dispatch(showRequiredFields(true))
                return true
            }
        }
        return false
    }

    const upload = async (resp) => {
        let data = new FormData();
        try {
            data.append('file', {
                uri: resp.uri,
                type: resp.type,
                name: resp.name || resp.fileName
            });
            const response = await fetch(baseURL + 'uploader?key=analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            });
            const text = await response.text();
            // console.log('text', text);
            let json = JSON.parse(text);
            if (json.state === 'success') {
                // MultiPlatform.ToastShow("Изображение загружено");
                // console.log("Успешно загружено")
                return json?.filename
            } else {
                throw json?.message;
            }
        } catch (e) {
            throw e.message;
        }
    }

    const sendData = async () => {
        setLoading(true)
        if (!checkRequiredFields()) {
            console.log("All fields is complete")
            const keys = Object.keys(anamnezData)
            let sendAnamnezData = anamnezData
            let sendQuestionData
            let file = ""
            // console.log(JSON.stringify(sendAnamnezData))
            try {
                for (let i = 0; i < keys.length; i++) {
                    let element = sendAnamnezData[i]
                    // console.log("testAnamnezData[" + i + "]::" + JSON.stringify(element))
                    if (element?.file) {
                        if(element.file?.[0]) {
                            for (let j = 0; j < element.file.length; j++) {
                                let element1 = element.file[j];
                                console.log("file[" + i + "]::" + JSON.stringify(element1))

                                let filenameResp = await upload(element1)
                                if (file === "") {
                                    file += filenameResp
                                } else {
                                    file += ";" + filenameResp
                                }
                                if (j === element.file.length - 1) {
                                    console.log("'FILE'::" + file)
                                    sendAnamnezData = {...sendAnamnezData, [i]: {...sendAnamnezData[i], file: file}}
                                }
                            }
                            file = ""
                            console.log("")
                        } else {
                            sendAnamnezData = {...sendAnamnezData, [i]: {...sendAnamnezData[i], file: ""}}
                        }
                    }
                }
            } catch (e) {
                MultiPlatform.ToastShow(e.message)
            }
            console.log("   ИТОГО::")
            for (let i = 0; i < keys.length; i++) {
                let element = sendAnamnezData[i]
                console.log("testAnamnezData[" + i + "]::" + JSON.stringify(element))
            }

            if (userAbout["first_name"] && userAbout["second_name"] && userAbout["middle_name"] && userAbout["gender"]) {
                console.log("для близкого")
                sendQuestionData = {
                    q_body: questionBody,
                    qsh_anamnes: JSON.stringify(sendAnamnezData),
                    q_specialist_id: selectedSpecialistID,
                    q_specialty_id: selectedSpecialtyID,
                    user_about: JSON.stringify(userAbout)
                }
            } else {
                console.log("для себя любимого")
                sendQuestionData = {
                    q_body: questionBody,
                    qsh_anamnes: JSON.stringify(sendAnamnezData),
                    q_specialist_id: selectedSpecialistID,
                    q_specialty_id: selectedSpecialtyID,
                }
            }

            let request = await Request.post(baseApiURL + "Ask_question", sendQuestionData);
            if (request) {
                if (request["response"]) {
                    console.log(request["response"])
                    navigation.navigate("MessagesScreen")
                } else {
                    console.log(request["error"])
                }
            } else {
                console.log("Что-то пошло не так...")
            }
        } else {
            console.log("Missed fields")
        }
        setLoading(false)
    }

    return (
        <TouchableOpacity onPress={() => sendData()} style={styles.buttonStyle}>
            {loading ? <ActivityIndicator color={'#fff'} size={'large'}/> : (
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: MultiPlatform.AdaptivePixelsSize(17)
                }}>
                    Задать вопрос
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: '100%',
        height: 60,
        backgroundColor: '#58BE3F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10
    }
})

export default SendButtonBase;
