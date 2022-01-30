import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAnamnezAnswer } from '../../store/reducers/AnamnezSlice';
import AnamnezSlice from '../../store/reducers/AnamnezSlice';

const colors = {
    selectedButtonAccentType: '#54B9D1',
    deselectAccentType: '#F3F4F6',
    selectedTextType: '#FFFFFF',
    deselectTextType: '#434A53'
}

const ChoicesButtonBase = ({ component, index, data}) => {

    const dispatch = useDispatch()
    const showRequired = useSelector(state => state.AnamnezSlice.showRequiredFields)

    const [selected, setSelected] = useState(null)
    const [require, setRequire] = useState()

    useEffect(() => {
        showRequired && selected == null ? setRequire(true) : setRequire(false)
    }, [showRequired]) 

    const selectItem = (check) => {
        setSelected(check)
        setRequire(false)
    }

    return (
        <View style={ styles.mainContent }>
            <View style={ styles.choicesButton }>
                <TouchableOpacity
                    onPress={() => { 
                        selectItem(1),
                        dispatch(addAnamnezAnswer({
                            index: index,
                            sh_field_type: {
                                sh_field: data.id,
                                bool: "Да",
                                val: "",
                                isRequired: data.is_required == "1" ? true : false
                            }
                        }))}}
                    style={{ 
                        ...styles.buttonsStyle,
                        backgroundColor: selected == 1 ? 
                            colors.selectedButtonAccentType : colors.deselectAccentType,
                        borderWidth: require && data.is_required == "1" ? 2 : 0,
                        borderColor: require && data.is_required == "1" ? '#F27C83' : '#FFFFFF'
                    }}
                >
                    <Text 
                        style={{ 
                            ...styles.textStyle,
                            color: selected == 1 ? 
                                colors.selectedTextType : colors.deselectTextType,
                        }}
                    >Да</Text>
                </TouchableOpacity>   
                <TouchableOpacity
                    onPress={() => { 
                        selectItem(0),
                        dispatch(addAnamnezAnswer({
                            index: index,
                            sh_field_type: {
                                sh_field: data.id,
                                bool: "Нет",
                                val: "",
                                isRequired: false
                            }
                        }))
                    }}
                    style={{ 
                        ...styles.buttonsStyle,
                        backgroundColor: selected == 0 ? 
                            colors.selectedButtonAccentType : colors.deselectAccentType,
                        borderWidth: require && data.is_required == "1" ? 2 : 0,
                        borderColor: require && data.is_required == "1" ? '#F27C83' : '#FFFFFF'
                    }}
                >
                    <Text  
                        style={{ 
                            ...styles.textStyle,
                            color: selected == 0 ? 
                                colors.selectedTextType : colors.deselectTextType 
                        }}
                    >Нет</Text>
                </TouchableOpacity> 
            </View>
            { selected == 1 && component }  
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        width: '100%',
    },
    choicesButton: {
        flexDirection: 'row',
        marginTop: 12,
    },
    buttonsStyle: {
        height: 55,
        width: '35%',
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    textStyle: {
        fontSize: 17,
        color: '#434A53'
    },
})

export default ChoicesButtonBase;