import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SecondAuthButton from '../AuthComponent/SecondAuthButton';
import Request from '../../requests/Request';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../store/reducers/LoginSlice';
import BaseSendButton from "../AuthComponent/BaseSendButton";
import AgreementComponent from "../AuthComponent/AgreementComponent";
import BaseDateTimePicker from "../AuthComponent/BaseDateTimePicker";
import {MultiPlatform} from "../MultiPlatform";
import Storage from "../../storage/Storage";
import Routes from "../../requests/Routes";
import { ScrollView } from 'react-native-gesture-handler'
import BaseSelectGender from "./BaseSelectGender";

const AppleFormComponent = ({ email, username }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [gender, setGender]        = useState("ж")
    const [birth_date, setBirth_date]= useState()

    const [agreementAccepted, setAgreementAccepted] = useState(false)

    const [response, setResponse] = useState("")
    const [loading, setLoading]   = useState(false)

    useEffect(() => {
        console.log(gender === "м" ? "Мужчина" : "Женщина")
    },[gender])

    const SignApple = async () => {
        if(!validateBirth()){
            return
        }
        setLoading(true)
        let dateBirth = birth_date.getUTCFullYear()+"."+(birth_date.getUTCMonth()+1)+"."+birth_date.getUTCDate()
        let fullname = await Storage.get("AppleID-fullname")
        let data = {
            name:       fullname?.givenName,
            familia:    fullname?.familyName,
            last_name:  fullname?.middleName,
            gender:     gender,
            birth_date: dateBirth,
            email: email,
            username: username,
        }
        let request = await Request.post(Routes.signWithApple, data);
        setResponse(request)

        let day = birth_date.getUTCDate(),
            month = birth_date.getUTCMonth()+1,
            year = birth_date.getUTCFullYear();
        day = day < 10 ? "0"+day : day;
        month = month < 10 ? "0"+month : month;
        let dateRU = year+"-"+month+"-"+day

        if(request?.userData){
            let newUser = {
                auth: true,
                isSpecialist: false,
                first_name: fullname?.givenName,
                second_name: fullname?.familyName,
                middle_name: "",
                username: fullname?.givenName + " " + fullname?.familyName,
                gender: gender,
                birth_date: dateRU,
                email: email,
                phone: request?.userData?.phone,
                photo: request?.userData?.photo
            }
            dispatch(saveUserData(newUser))
            await Storage.save("userData", newUser)
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainNavigationScreen' }],
            })
        }
        setLoading(false)
    }

    const checkFilledField = () => {
        if (gender && birth_date && agreementAccepted){
            return true
        } else {
            return false
        }
    }
    function validateBirth() {
        let curDate = new Date()
        if(curDate < birth_date) {
            MultiPlatform.ToastShow("Выбранная дата больше нынешней")
            return false;
        }
        return true
    }

    return (
        <View style={styles.mainBlock}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewStyle}
                contentContainerStyle={{ justifyContent: 'center', padding: 10}}
            >
                <Text style={styles.textStyle}>Пожалуйста, заполните оставшиеся данные</Text>
                <View>
                    <BaseSelectGender response={response} setValue={setGender} />
                    <BaseDateTimePicker hint={"Дата рождения"} response={response} setValue={setBirth_date}/>
                </View>
                <View style={{ marginTop: 20 }}>
                    <AgreementComponent setValue={setAgreementAccepted}/>
                </View>
                <View style={ styles.btnBottom }>
                    { response['error'] &&
                    <Text style={{ color: "#F27C83", fontSize: MultiPlatform.AdaptivePixelsSize(15), paddingBottom: 10}}>{response['error']}</Text>
                    }
                    <BaseSendButton text={"Авторизоваться"} checkFields={checkFilledField} onPress={SignApple} loading={loading}/>
                    <SecondAuthButton text={"Вернуться"} nav={"AuthScreen"} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBlock: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerStyle :{
        color: "black",
        marginTop: MultiPlatform.AdaptivePixelsSize(-10),
        marginBottom: MultiPlatform.AdaptivePixelsSize(-30),
    },
    btnBottom: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    textStyle: {
        textAlign: 'center',
        color: '#000',
        marginBottom: 10,
        marginTop: MultiPlatform.AdaptivePixelsSize(15),
        fontSize: MultiPlatform.AdaptivePixelsSize(15),
    },
    btnStyle: {
        width: MultiPlatform.AdaptivePixelsSize(320),
        height: MultiPlatform.AdaptivePixelsSize(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    scrollViewStyle:{
        flex: 1,
        width: '100%',
        // backgroundColor: 'black',
        paddingLeft: MultiPlatform.AdaptivePixelsSize(15),
        paddingRight: MultiPlatform.AdaptivePixelsSize(15),
    }
});

export default AppleFormComponent
