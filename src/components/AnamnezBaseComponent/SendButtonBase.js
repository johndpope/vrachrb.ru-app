import React, { Component, useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AnamnezSlice, { showRequiredFields } from '../../store/reducers/AnamnezSlice';

const SendButtonBase = () => {

    const allData = useSelector(state => state.AnamnezSlice.anamnezData)
    const dispatch = useDispatch()

    const checkRequiredFields = () => {
        const keys = Object.keys(allData)

        for (let i = 0; i < keys.length; i++){
            let value = allData[keys[i]]
            if ((value.choices && value.choices.length == 0 && value.isRequired) || 
                (value.val == "" && value.isRequired)){
                dispatch(showRequiredFields(true))
                return true
            }
        }
        return false
    }

    const sendData = () => {
        // checkRequiredFields() ? console.log("Missed fields") : console.log("All fields is complete")
        // console.log(checkRequiredFields())
        console.log(allData)
    }

    return(
        <TouchableOpacity onPress={() => sendData()} style={ styles.buttonStyle }>
            <Text style={{
                color: '#FFFFFF',
                fontSize: 17
            }}>
                Задать вопрос
            </Text>
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
