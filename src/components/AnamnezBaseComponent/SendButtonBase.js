import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AnamnezSlice, { showRequiredFields } from '../../store/reducers/AnamnezSlice';

const SendButtonBase = () => {

    const allData = useSelector(state => state.AnamnezSlice.anamnezData)
    const count = useSelector(state => state.AnamnezSlice.countRequiredFields)
    const dispatch = useDispatch()

    return(
        <TouchableOpacity onPress={() => { console.log(allData), 
        count != 0 && dispatch(showRequiredFields(true)), console.log(count) }} style={ styles.buttonStyle }>
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
