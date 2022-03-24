import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAnamnezAnswer } from '../../store/reducers/AnamnezSlice';
import { MultiPlatform } from '../MultiPlatform';

const SingleTextBase = ({ addText = "", isRequired, data, index }) => {

    const dispatch = useDispatch()
    const showRequired = useSelector(state => state.AnamnezSlice.showRequiredFields)
    
    const [require, setRequire] = useState(null)
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
        data.field_type == "yes_no_input" ? dispatch(addAnamnezAnswer({
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
        <View>
            <TextInput 
                style={ require && data.is_required == "1" ? {...styles.textInputStyle, backgroundColor: '#FFFFFF', borderColor: '#F27C83', borderWidth: 1 } : styles.textInputStyle }
                multiline={false}
                textAlign='left'
                textAlignVertical='center'
                placeholder={ 'Введите текст' }
                placeholderTextColor={ require && data.is_required == "1" ? '#F27C83' : "#AAB2BD"}
                onChangeText={text => checkInputs(text.trim())}
            /> 
            { addText != "" && 
                <Text style={ styles.additionalFieldStyle }>{ addText }</Text> 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: '100%',
        height: MultiPlatform.AdaptivePixelsSize(55),
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        fontWeight: '400',
        paddingLeft: 15,
        color: '#434A53',
        marginTop: 12
    },
    additionalFieldStyle: {
        fontSize: MultiPlatform.AdaptivePixelsSize(15),
        color: '#434A53',
        fontWeight: '400',
        marginLeft: 3
    }
})


export default SingleTextBase;
