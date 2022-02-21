import React, { useState } from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
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


const RegisterFormComponent = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [name, setName]            = useState("")
    const [familia, setFamilia]      = useState("")
    const [last_name, setLast_name]  = useState("")
    const [gender, setGender]        = useState("м")
    const [birth_date, setBirth_date]= useState("")
    const [phone, setPhone]          = useState("")
    const [email, setEmail]          = useState("")
    const [password, setPassword]    = useState("")
    const [password2, setPassword2]  = useState("")

    const [agr1, setAgr1]            = useState(false)
    const [agr2, setAgr2]      = useState(false)
    const [agr3, setAgr3]  = useState(false)

    const [response, setResponse]    = useState("")
    const [loading, setLoading] = useState(false)

    const register = async () => {
        if(!validateEmailPhonePass(email,phone)){
            return
        }
        setLoading(true)
        let data = {
            name:       name,
            familia:    familia,
            last_name:  last_name,
            gender:     gender,
            birth_date: birth_date,
            phone:      phone,
            email:      email,
            password:   password,
        }
        let request = await Request.post(Routes.registerURL, data);

        setResponse(request)

        let newUser = {
            auth: true,
            isSpecialist: false,
            first_name: name,
            second_name: familia,
            middle_name: last_name,
            username: email,
            gender: gender,
            birth_date: birth_date + " .",
            email: email,
            phone: phone,
            photo: ""
        }
        request['response'] && dispatch(saveUserData(newUser))
        request['response'] && await Storage.save("userData", newUser)

        request['response'] &&
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainNavigationScreen' }],
        })
        setLoading(false)
    }

    const checkFilledField = () => {
        if (name && familia && last_name && gender && birth_date && phone && email && password && password2 && agr1 && agr2 && agr3){
            return true
        } else {
            return false
        }
    }

    function validateEmailPhonePass(email,phone) {
        let regMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
        let regPhone = /^\d[\d\(\)\ -]{4,14}\d$/;
        if(!regMail.test(email)) {
            MultiPlatform.ToastShow('Введите корректный email')
            return false;
        }
        if(!regPhone.test(phone)) {
            MultiPlatform.ToastShow('Введите корректный номер телефона')
            return false;
        }
        if(password != password2){
            MultiPlatform.ToastShow('Пароли не совпадают')
            return false;
        }
        return true
    }

    return (
        <View style={styles.mainBlock}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', width: '85%', padding: 10}}
            >
                <View>
                    <BaseTextInput response={response} hint={"Имя"} setValue={setName}/>
                    <BaseTextInput response={response} hint={"Фамилия"} setValue={setFamilia}/>
                    <BaseTextInput response={response} hint={"Отчество"} setValue={setLast_name}/>
                    <BaseTextInput response={response} hint={"Номер телефона"} setValue={setPhone}/>
                    <BaseTextInput response={response} hint={"Электронная почта"} setValue={setEmail}/>
                    <BaseTextInput response={response} hint={"Пароль"} setValue={setPassword} pass={true}/>
                    <BaseTextInput response={response} hint={"Повторите пароль"} setValue={setPassword2} pass={true}/>
                    <Picker dropdownIconColor={'black'}
                            style={styles.pickerStyle}
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                        <Picker.Item label="Мужчина" value="м" />
                        <Picker.Item label="Женщина" value="ж" />
                    </Picker>
                    <BaseDateTimePicker text={"Дата рождения"} setValue={setBirth_date}/>
                </View>
                <View style={{marginTop: 10}}>
                    <AgreementComponent setValue={setAgr1} index={0}/>
                    <AgreementComponent setValue={setAgr2} index={1}/>
                    <AgreementComponent setValue={setAgr3} index={2}/>
                </View>
                <View style={ styles.btnBottom }>
                    { response['error'] &&
                    <Text style={{ color: "#F27C83", fontSize: 15, paddingBottom: 10}}>{response['error']}</Text>
                    }
                    <BaseSendButton text={"Зарегистрироваться"} checkFields={checkFilledField} onPress={register} loading={loading}/>
                    <SecondAuthButton text={"Авторизоваться"} nav={"MailLoginScreen"} />
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
        height: MultiPlatform.AdaptivePixelsSize(50),
        backgroundColor:"#F3F4F6",
        color: "black",
        marginTop: 10,
    },
    textInputStyle: {
        borderBottomWidth: 2,
        width: MultiPlatform.AdaptivePixelsSize(350),
        marginTop: 5,
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        borderRadius: 1,
        color: '#434A53'
    },
    btnBottom: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    textStyle: {
        color: '#FFFFFF',
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

export default RegisterFormComponent
