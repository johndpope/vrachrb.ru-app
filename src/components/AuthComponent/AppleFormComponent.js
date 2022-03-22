import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SecondAuthButton from '../AuthComponent/SecondAuthButton';
import Request from '../../requests/Request';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../store/reducers/LoginSlice';
import BaseTextInput from "../AuthComponent/BaseTextInput";
import BaseSendButton from "../AuthComponent/BaseSendButton";
import AgreementComponent from "../AuthComponent/AgreementComponent";
import {Picker} from '@react-native-picker/picker';
import BaseDateTimePicker from "../AuthComponent/BaseDateTimePicker";
import {MultiPlatform} from "../MultiPlatform";
import Storage from "../../storage/Storage";
import Routes from "../../requests/Routes";
import { ScrollView } from 'react-native-gesture-handler'
import BackButton from '../HeaderComponent/BackButton';

const AppleFormComponent = ({ email, username }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [name, setName]            = useState("")
    const [familia, setFamilia]      = useState("")
    const [gender, setGender]        = useState("м")
    const [birth_date, setBirth_date]= useState()

    const [agreementAccepted, setAgreementAccepted] = useState(false)

    const [response, setResponse]    = useState("")
    const [loading, setLoading] = useState(false)

    const SignApple = async () => {
        if(!validateBirth()){
            return
        }
        setLoading(true)
        let dateBirth = birth_date.getUTCFullYear()+"."+(birth_date.getUTCMonth()+1)+"."+birth_date.getUTCDate()
        let data = {
            name:       name,
            familia:    familia,
            gender:     gender,
            birth_date: dateBirth,
            email: email,
            username: username,
        }
        let request = await Request.post(Routes.signWithApple, data);
        setResponse(request)

        if(request?.userData){
            let newUser = {
                auth: true,
                isSpecialist: false,
                first_name: name,
                second_name: familia,
                middle_name: "",
                username: name + " " + familia,
                gender: gender,
                birth_date: dateBirth + " .",
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
        if (name && familia && gender && birth_date && agreementAccepted){
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
            <Text style={styles.textStyle}>Пожалуйста, заполните оставшиеся данные</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, width: '100%', paddingLeft: MultiPlatform.AdaptivePixelsSize(15), paddingRight: MultiPlatform.AdaptivePixelsSize(15), }}
                contentContainerStyle={{ justifyContent: 'center', padding: 10}}
            >
                <View>
                    <BaseTextInput response={response} hint={"Имя"} setValue={setName}/>
                    <BaseTextInput response={response} hint={"Фамилия"} setValue={setFamilia}/>
                    <Picker
                        dropdownIconColor={'black'}
                        style={styles.pickerStyle}
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}

                    >
                        <Picker.Item label="Мужчина" value="м" />
                        <Picker.Item label="Женщина" value="ж" />
                    </Picker>
                    <BaseDateTimePicker text={"Дата рождения"} setValue={setBirth_date}/>
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
        marginTop: MultiPlatform.AdaptivePixelsSize(15),
        color: '#000',
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
    btnStyle: {
        width: MultiPlatform.AdaptivePixelsSize(320),
        height: MultiPlatform.AdaptivePixelsSize(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
});

export default AppleFormComponent
