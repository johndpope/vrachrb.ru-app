import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionBody, setUAKey } from '../../store/reducers/AnamnezSlice';


const BaseTextInput = ({ customStyle, idDispatch, is_required=true, hint="Введите текст", multiline=false, maxLength = 1000, props }) => {

    const dispatch = useDispatch()

    const [require, setRequire] = useState()
    const [textInp, setTextInp] = useState("")

    //Глобальная подсвечивание обязательных полей
    useEffect(() => {
        is_required && textInp === "" ? setRequire(true) : setRequire(false)
    }, [textInp])
    const checkInputs = (text) => {

        setTextInp(text)

        switch (idDispatch) {
            case 1:
                dispatch(setQuestionBody(text))
                break;
            case 2:
                dispatch(setUAKey({index: "first_name", body: text}))
                break;
            case 3:
                dispatch(setUAKey({index: "second_name", body: text}))
                break;
            case 4:
                dispatch(setUAKey({index: "middle_name", body: text}))
                break;
        }
    }

    return (
        <TextInput
            style={ require ? {...styles.textInputStyle, backgroundColor: '#FFFFFF', borderColor: '#F27C83', borderWidth: 2, ...customStyle }
                : { ...styles.textInputStyle, ...customStyle} }
            multiline={ multiline }
            textAlign='left'
            textAlignVertical='top'
            maxLength={ maxLength }
            placeholder={ hint }
            placeholderTextColor={ require ? '#F27C83' : "#AAB2BD"}
            onChangeText={text => checkInputs(text)}
        />
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        fontSize: 17,
        fontWeight: '400',
        padding: 15,
        color: '#434A53',
        marginTop: 8,

        height: 120,
        width: '100%',
        marginLeft: '0%',
        marginRight: '0%',
    },
})

export default BaseTextInput;