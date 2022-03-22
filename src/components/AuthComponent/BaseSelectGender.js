import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAnamnezAnswer } from '../../store/reducers/AnamnezSlice';
import { MultiPlatform } from '../MultiPlatform';

const colors = {
    selectedButtonAccentType: '#54B9D1',
    deselectAccentType: '#F3F4F6',
    selectedTextType: '#FFFFFF',
    deselectTextType: '#434A53'
}

const BaseSelectGender = ({ response, setValue }) => {

    const [showError, setError] = useState(response)
    const [selected, setSelected] = useState(0)
    const [require, setRequire] = useState()

    useEffect(() => {
        showError["error"] ? setRequire(true) : setRequire(false)
    }, [showError])

    const selectItem = (check) => {
        setSelected(check)
        setRequire(false)
        check === 1 ? setValue("м") : setValue("ж")
    }

    return (
        <View style={ styles.mainContent }>
            <TouchableOpacity
                onPress={() => selectItem(1)}
                style={{...styles.buttonsStyle,
                    backgroundColor: selected === 1 ?
                        colors.selectedButtonAccentType : colors.deselectAccentType,
                    borderWidth: require ? 2 : 0,
                    borderColor: require ? '#F27C83' : '#FFFFFF',
                    marginRight: 10,
                }}
            >
                <Text style={{...styles.textStyle,
                    color: selected === 1 ? colors.selectedTextType : colors.deselectTextType,
                }}
                >Мужчина</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => selectItem(0)}
                style={{...styles.buttonsStyle,
                    backgroundColor: selected === 0 ? colors.selectedButtonAccentType : colors.deselectAccentType,
                    borderWidth: require ? 2 : 0,
                    borderColor: require ? '#F27C83' : '#FFFFFF'
                }}
            >
                <Text style={{...styles.textStyle,
                    color: selected === 0 ? colors.selectedTextType : colors.deselectTextType
                }}
                >Женщина</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        // backgroundColor: 'red'
    },
    buttonsStyle: {
        height: MultiPlatform.AdaptivePixelsSize(55),
        flex: 1,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        color: '#434A53'
    },
})

export default BaseSelectGender;