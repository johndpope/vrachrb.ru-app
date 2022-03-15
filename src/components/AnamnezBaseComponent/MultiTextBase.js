import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAnamnezAnswer } from '../../store/reducers/AnamnezSlice';
import { addBodyText } from '../../store/reducers/EstimateSlice';


const MultiTextBase = ({ data = [], index = 0, starred = false }) => {

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
        })) : data.field_type == "textarea_upload" ? dispatch(addAnamnezAnswer({
                index: index,
                sh_field_type: {
                    sh_field: data.id,
                    val: text,
                    file: "",
                    isRequired: data.is_required == "1" ? true : false
                }
            }))
            : starred ? dispatch(addBodyText(text)) 
            : dispatch(addAnamnezAnswer({
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
            style={ require && data.is_required == "1" ? {...styles.textInputStyle, backgroundColor: '#FFFFFF', borderColor: '#F27C83', borderWidth: 2 } : styles.textInputStyle }
            multiline={true}
            textAlign='left'
            textAlignVertical='top'
            placeholder={ 'Введите текст' }
            placeholderTextColor={ require && data.is_required == "1" ? '#F27C83' : "#AAB2BD"}
            onChangeText={text => checkInputs(text.trim())}
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