import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { MultiPlatform } from '../components/MultiPlatform';
import {selectSpecialistID, selectSpecialtyID} from '../store/reducers/AnamnezSlice';

const ModalScreen = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    return(
        <View style={ styles.mainContent }>
            <View style={ styles.wrapper }>
                <Text style={{ 
                    ...styles.textStyle,
                    fontSize: MultiPlatform.AdaptivePixelsSize(19),
                    fontWeight: '600'
                }}>
                    Так к кому обратиться?
                </Text>
                <Text style={{ 
                    ...styles.textStyle,
                    fontSize: MultiPlatform.AdaptivePixelsSize(17),
                    fontWeight: '400',
                    marginTop: 12,
                    marginBottom: 32 
                }}>
                    Если не получается выбрать специалиста
                    или кабинет, спросите терапевта — 
                    он выслушает вас и скажет,  что делать
                </Text>
            </View>
            <View style={ styles.buttonWrapper }>
                <TouchableOpacity style={ styles.buttonStyle }
                    onPress={() => {
                        dispatch(selectSpecialistID(51));
                        dispatch(selectSpecialtyID(6));
                        navigation.navigate("StartScreen")
                    }}
                >
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: MultiPlatform.AdaptivePixelsSize(17)
                    }}>
                        Спросить терапевта
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ 
                        ...styles.buttonStyle,
                        backgroundColor: '#FFFFFF',
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{
                        color: '#434A53',
                        fontSize: MultiPlatform.AdaptivePixelsSize(17)
                    }}>Закрыть</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    textStyle: {
        color: '#434A53',
        textAlign: 'center'
    },
    buttonStyle: {
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: '#54B9D1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: MultiPlatform.AdaptivePixelsSize(16)
    },
    wrapper: {
        width: '85%'
    },
    buttonWrapper: {
        width: '85%',
    }
})

export default ModalScreen;
