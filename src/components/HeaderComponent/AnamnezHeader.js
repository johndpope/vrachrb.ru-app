import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import { useDispatch } from 'react-redux'
import { addAnamnezAnswer, resetAllValues, showRequiredFields } from '../../store/reducers/AnamnezSlice';

const AnamnezHeader = ({ page }) => {

    const navigation = useNavigation()

    return(
        <View style={{
            width: '100%',
            height: 65,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <BackButton />
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    color: '#434A53',
                    fontWeight: '700',
                    fontSize: 21,
                }}>{ page }</Text>
                <Text style={{
                    color: '#AAB2BD',
                    fontWeight: '700',
                    fontSize: 21,
                }}>/2</Text>
            </View>
            <TouchableOpacity 
                onPress={() => {
                    navigation.reset({
                            index: 0,
                            routes: [{ name: 'MainScreen' }],
                        }) 
                    }}
                style={{
                    position: 'absolute',
                    right: 14,
                }}>
                <Text style={{
                    color: '#434A53',
                    fontWeight: '700',
                    fontSize: 21,
                }}>Отмена</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AnamnezHeader;
