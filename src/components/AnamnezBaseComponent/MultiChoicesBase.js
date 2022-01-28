import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAnamnezAnswer, numOfRequiredFields } from '../../store/reducers/AnamnezSlice';
import AnamnezSlice from '../../store/reducers/AnamnezSlice';


const MultiChoicesBase = ({ choices, data, index }) => {

    const dispatch = useDispatch()
    const showRequired = useSelector(state => state.AnamnezSlice.showRequiredFields)

    const [choicesSelected, setChoicesSelected] = useState([])
    const [require, setRequire] = useState(null)

    useEffect(() => {
        console.log("MultiChoiceBase: " + require)
        if (data.is_required == "1" && require != null){
            require ? dispatch(numOfRequiredFields(1)) : dispatch(numOfRequiredFields(-1))
        }
    }, [require])

    //Глобальная подсвечивание обязательных полей
    useEffect(() => {
        console.log("MultiChoiceBase showRequired: " + showRequired)
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
                choices: prevChoicesSelected
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
                choices: prevChoicesSelected
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
                            } : require ? {...styles.buttonChoiceStyle, borderColor: '#F27C83'} : styles.buttonChoiceStyle }
                        >
                            <Text style={ choicesSelected.includes(choiceText) ? {
                                ...styles.textStyle,
                                color: '#FFFFFF'
                            } :styles.textStyle }>{ choiceText.charAt(0).toUpperCase() + choiceText.slice(1) }</Text>
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
        padding: 18,
        borderColor: '#CCD1D9',
        borderWidth: 2,
        borderRadius: 8,
    },
    textStyle: { 
        color: '#434A53', 
        fontSize: 17 
    }
})

export default MultiChoicesBase;
