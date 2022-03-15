import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAnamnezAnswer } from '../../store/reducers/AnamnezSlice';
import { MultiPlatform } from '../MultiPlatform';


const MultiChoicesBase = ({ choices, data, index }) => {

    const dispatch = useDispatch()
    const showRequired = useSelector(state => state.AnamnezSlice.showRequiredFields)

    const [choicesSelected, setChoicesSelected] = useState([])
    const [require, setRequire] = useState(null)

    //Глобальная подсвечивание обязательных полей
    useEffect(() => {
        if (showRequired != null){
            (showRequired && choicesSelected.length == 0 ) && data.is_required == "1" ? setRequire(true) : setRequire(false)
        }
    }, [showRequired]) 

    const selectItem = (choiceText) => {
        let prevChoicesSelected = [...choicesSelected]

        prevChoicesSelected.push(choiceText)
        setChoicesSelected(prevChoicesSelected)
        dispatch(addAnamnezAnswer({
            index: index,
            sh_field_type: {
                sh_field: data.id,
                choices: prevChoicesSelected,
                isRequired: data.is_required == "1" ? true : false
            }
        }))
        
        console.log(prevChoicesSelected.length, prevChoicesSelected)

        data.is_required == "1" && prevChoicesSelected.length != 0 ? setRequire(false) : setRequire(true)

    }

    const deselectItem = (choiceText) => {
        let prevChoicesSelected = [...choicesSelected]
        
        prevChoicesSelected.splice(prevChoicesSelected.indexOf(choiceText), 1)
        setChoicesSelected(prevChoicesSelected)
        dispatch(addAnamnezAnswer({
            index: index,
            sh_field_type: {
                sh_field: data.id,
                choices: prevChoicesSelected,
                isRequired: data.is_required == "1" ? true : false
            }
        }))

        console.log(prevChoicesSelected.length, prevChoicesSelected)

        if (data.is_required == "1"){
            prevChoicesSelected.length != 0 ? setRequire(false) : setRequire(true)
        }
    }

    return(
        <View style={ styles.mainContent }>
            {
                choices.map((choiceText) => {
                    return(
                        <TouchableOpacity 
                            key={choices.indexOf(choiceText)}
                            onPress={choicesSelected.includes(choiceText) ? () => deselectItem(choiceText) : () => selectItem(choiceText)} 
                            style={ choicesSelected.includes(choiceText) ? {
                                ...styles.buttonChoiceStyle,
                                backgroundColor: '#54B9D1',
                                borderColor: '#FFFFFF'
                            } : require && data.is_required == "1" ? {...styles.buttonChoiceStyle, borderColor: '#F27C83'} : styles.buttonChoiceStyle }
                        >
                            <Text style={ choicesSelected.includes(choiceText) ? {
                                ...styles.textStyle,
                                color: '#FFFFFF'
                            } : styles.textStyle }>{ choiceText.charAt(0).toUpperCase() + choiceText.slice(1) }</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    buttonChoiceStyle: {
        width: '100%',
        marginBottom: 10,
        padding: MultiPlatform.AdaptivePixelsSize(18),
        borderColor: '#CCD1D9',
        borderWidth: 2,
        borderRadius: MultiPlatform.AdaptivePixelsSize(8),
    },
    textStyle: { 
        color: '#434A53', 
        fontSize: MultiPlatform.AdaptivePixelsSize(17) 
    }
})

export default MultiChoicesBase;
