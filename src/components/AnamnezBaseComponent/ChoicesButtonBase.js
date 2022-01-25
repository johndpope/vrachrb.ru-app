import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MultiTextBase from './MultiTextBase';

const colors = {
    selectedButtonAccentType: '#54B9D1',
    deselectAccentType: '#F3F4F6',
    selectedTextType: '#FFFFFF',
    deselectTextType: '#434A53'
}

const ChoicesButtonBase = ({ component }) => {

    const [selected, setSelected] = useState(null)

    return (
        <View style={ styles.mainContent }>
            <View style={ styles.choicesButton }>
                <TouchableOpacity
                    onPress={() => setSelected(1)}
                    style={{ 
                        ...styles.buttonsStyle,
                        backgroundColor: selected == 1 ? 
                            colors.selectedButtonAccentType : colors.deselectAccentType 
                    }}
                >
                    <Text 
                        style={{ 
                            ...styles.textStyle,
                            color: selected == 1 ? 
                                colors.selectedTextType : colors.deselectTextType
                        }}
                    >Да</Text>
                </TouchableOpacity>   
                <TouchableOpacity
                    onPress={() => setSelected(2)}
                    style={{ 
                        ...styles.buttonsStyle,
                        backgroundColor: selected == 2 ? 
                            colors.selectedButtonAccentType : colors.deselectAccentType 
                    }}
                >
                    <Text  
                        style={{ 
                            ...styles.textStyle,
                            color: selected == 2 ? 
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