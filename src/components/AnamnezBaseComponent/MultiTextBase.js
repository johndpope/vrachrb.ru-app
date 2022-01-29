import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAnamnezAnswer, numOfRequiredFields } from '../../store/reducers/AnamnezSlice';
import AnamnezSlice from '../../store/reducers/AnamnezSlice';


const MultiTextBase = ({ isRequired, data, index }) => {

    const dispatch = useDispatch()
    const showRequired = useSelector(state => state.AnamnezSlice.showRequiredFields)
    
    const [require, setRequire] = useState()
    const [textInp, setTextInp] = useState("")

    //Глобальная подсвечивание обязательных полей
    useEffect(() => {
        if (showRequired != null){
            (showRequired && textInp == "" ) && data.is_required == "1" ? setRequire(true) : setRequire(false)
        }
    }, [showRequired]) 

    const checkInputs = (text) => {
        data.is_required == "1" && text != "" ? setRequire(false) : setRequire(true)
        
        setTextInp(text)
        data.field_type == "yes_no_textarea" ? dispatch(addAnamnezAnswer({
            index: index,
            sh_field_type: {
                sh_field: data.id,
                bool: text ? "Да" : "Нет",
                val: text,
                isRequired: data.is_required == "1" ? true : false

            }
        })) : dispatch(addAnamnezAnswer({
            index: index,
            sh_field_type: {
                sh_field: data.id,
                val: text,
                isRequired: data.is_required == "1" ? true : false
            }
        })) 
    }

    return ( 
        <TextInput 
            style={ require ? {...styles.textInputStyle, backgroundColor: '#FFFFFF', borderColor: '#F27C83', borderWidth: 2 } : styles.textInputStyle }
            multiline={true}
            textAlign='left'
            textAlignVertical='top'
            placeholder={ !require ? 'Введите текст' : 'Введите текст' }
            placeholderTextColor={ require ? '#F27C83' : "#AAB2BD"}
            onChangeText={text => checkInputs(text)}
        /> 
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: '100%',
        height: 120,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        fontSize: 17,
        fontWeight: '400',
        padding: 15,
        color: '#434A53',
        marginTop: 12
    },
})

export default MultiTextBase;