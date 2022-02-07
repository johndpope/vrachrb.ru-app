import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addAnamnezAnswer, clickOnButton } from '../store/reducers/AnamnezSlice'
import AnamnezSlice from '../store/reducers/AnamnezSlice'
import Request from '../requests/Request'
import baseApiURL from '../requests/baseApiURL'
import DocumentPicker from 'react-native-document-picker'
import UploadFileBase from '../components/AnamnezBaseComponent/UploadFileBase'
import MultiChoicesBase from '../components/AnamnezBaseComponent/MultiChoicesBase'
import MultiTextBase from '../components/AnamnezBaseComponent/MultiTextBase'
import Storage from '../storage/Storage'

export const TestScreen1 = ({ fieldType, index }) => {

    const dispatch = useDispatch()

    return(
        <TextInput
            onChangeText={(text) => dispatch(changeTextData({
                index: index,
                sh_field_type: {sh_field: fieldType, val: text},
            }))}
            style={{
                borderBottomColor: 'black',
                width: 200,
                borderWidth: 2,
                color: 'black',
            }}
        />
    )
}

export const TestScreen2 = ({ fieldType, index }) => {

    const dispatch = useDispatch()

    return(
        <TextInput
            onChangeText={(text) => dispatch(changeTextData({
                index: index,
                sh_field_type: {sh_field: fieldType, val: text},
            }))}
            style={{
                borderBottomColor: 'black',
                width: 200,
                borderWidth: 2,
                color: 'black',
            }}
        />
    )
}

export const ButtonSender = () => {

    const dispatch = useDispatch()

    return (
        <TouchableOpacity
            onPress={() => dispatch(clickOnButton(true))}
            style={{
                width: 200,
                height: 70,
                backgroundColor: 'green'
            }}
        >
            <Text>Hello</Text>
        </TouchableOpacity> 
    )
}

const TestScreen = () => {

    
    const dispatch = useDispatch()
    // const text = useSelector(state => state.AnamnezSlice.text)
    const allData = useSelector(state => state.AnamnezSlice.anamnezData)

    const [image, setImage] = useState(null)
    // const [textInp, setTextInp] = useState()

    const isAuth = async () => {
        let data = await Request.get(baseApiURL + "is_auth", {})

        console.log(data)
    }

    let count = 0

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Мужчина', value: 'м'},
      {label: 'Женщина', value: 'ж'}
    ]);

    const LogOut1 = async () => {
        let DATA = await Request.get(baseApiURL + "SignOut", {})

        console.log(DATA)
    }

    const LogOut = async (text) => {
        // dispatch(addAnamnezAnswer({
        //     index: 0,
        //     sh_field_type: {
        //         sh_field: 75,
        //         val: text
        //     }
        // }))

        // const DATA = 
        // {"0": 
        //     {"isRequired": true, "sh_field": "75", "val": ""}, 
        // "1": 
        //     {"bool": "Нет", "isRequired": false, "sh_field": "78", "val": ""}, 
        // "10": {"choices": [], "sh_field": "87"}, 
        // "11": {"isRequired": true, "sh_field": "88", "val": ""}, "12": {"bool": "Нет", "isRequired": false, "sh_field": "89", "val": ""}, "2": {"bool": "Нет", "isRequired": false, "sh_field": "79", "val": ""}, "3": {"bool": "Нет", "isRequired": false, "sh_field": "80", "val": ""}, "4": {"bool": "Нет", "isRequired": false, "sh_field": "81", "val": ""}, "5": {"isRequired": true, "sh_field": "82", "val": ""}, "6": {"isRequired": false, "sh_field": "83", "val": ""}, "7": {"file": [], "isRequired": false, "sh_field": "84"}, "8": {"file": [], "isRequired": false, "sh_field": "85"}, "9": {"isRequired": true, "sh_field": "86", "val": ""}}


        // Object.entries(DATA).forEach(([key, value]) => {
        //     if ((value.test == "" && value.isReq) || (value.choices && value.choices.length == 0 && value.isReq)){
        //         console.log("value " + true)
        //     } else {
        //         console.log("value " + false)
        //     }
        // });
        // let DATA = await Request.get(baseApiURL + "Get_user_questions", {})

        // const key1 = Object.keys(DATA)

        // for (let i = 0; i < key1.length; i++){
        //     console.log(DATA[key1[i]])
        // }
        // let data = await Request.post(baseApiURL + "SignIn", {user: "CLIENT", password: "CLIENT"})
        // console.log(data)
        await Storage.save("hello", "Data")
        console.log(await Storage.get("hello"))
        // console.log(DATA["response"][0]["Question"].forEach(element => {
        //     // element["Answer"].length != 0 && 
        //     //     element["Answer"].forEach(item => {
        //     //         console.log(item["question_id"], item["body"])
        //     //     })
        //     console.log(element["Answer"])
        // }))
        // let data = await Request.post(baseApiURL + "SignIn", {user: "CLIENT", password: "CLIENT"})
        // console.log(data)
        // delete DATA[0].test
        // console.log("")
        // Object.entries(DATA).forEach(([key, value]) => {
        //     console.log(key, value);
        // });
    }

    const a = async () => {
        const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.images]
        });

        RNFetchBlob.fs
            .stat(res.uri)
            .then((stats) => {
                console.log(stats.path);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(
            result[0].uri
        )

        setImage(
            result[0].uri)
    }
    

    return (
        <View style={ styles.mainContent }>
            <View style={{ width: '85%' }}>
                {/* <View>
                    <TestScreen1 index={ 0 } fieldType={ 1 }/>
                    <TestScreen2 index={ 1 } fieldType={ 2 }/>
                    <ButtonSender />
                </View>
                <View style={{
                    marginTop: 50
                }}>
                    <Button title="isAuth" onPress={() => isAuth()}/>
                    <Button title="LogOut" onPress={() => LogOut()}/>
                </View> */}
                <TouchableOpacity 
                    onPress={() => a()}
                    style={{
                        width: 100,
                        height: 100,
                        borderColor: '#CCD1D9',
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center'
                }}>
                    <Image style={{ width: image != null ? 100 : 40, height: image != null ? 100 : 40, borderRadius: 8 }} source={ image != null ? {uri: image} : require('../images/plus.png') }/>
                </TouchableOpacity>
                {/* <UploadFileBase /> */}
                {/* <UploadFileBase />
                <Button title='Add' onPress={() => LogOut()}/> */}
                {/* <MultiChoicesBase /> */}
                {/* <MultiTextBase isRequired={1}/> */}
                <TextInput 
                    // onChangeText={text => LogOut(text)}
                    style={{ backgroundColor: 'wheat' }} 
                />
                <Button title='SignIn' onPress={() => LogOut()}/>                
                <Button title='LogOut' onPress={() => LogOut1()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
});

export default TestScreen
