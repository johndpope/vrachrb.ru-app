import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { changeTextData, clickOnButton } from '../store/reducers/AnamnezSlice'
import AnamnezSlice from '../store/reducers/AnamnezSlice'
import Request from '../requests/Request'
import baseApiURL from '../requests/baseApiURL'

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

    const text = useSelector(state => state.AnamnezSlice.text)
    const clicked = useSelector(state => state.AnamnezSlice.clicked)

    const isAuth = async () => {
        let data = await Request.get(baseApiURL + "is_auth", {})

        console.log(data)
    }

    const LogOut = async () => {
        console.log(text)
    }

    return (
        <View style={ styles.mainContent }>
            <View>
                <TestScreen1 index={ 0 } fieldType={ 1 }/>
                <TestScreen2 index={ 1 } fieldType={ 2 }/>
                <ButtonSender />
            </View>
            <View style={{
                marginTop: 50
            }}>
                <Button title="isAuth" onPress={() => isAuth()}/>
                <Button title="LogOut" onPress={() => LogOut()}/>
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
      alignItems: 'center'
    },
});

export default TestScreen
