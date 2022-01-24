import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';

const AnamnezHeader = () => {

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
                // Тут я попытался сделать счетчик текущего скрина анамнеза, пока что придумал такой костыль
                // Сделал так потому что идексы Navigation State считаются как-то неправильно
                // При переходе с MainScreen -> StartScreen (index = 0), StartScreen -> QuestionsScreen (index = 1),
                // QuestionsScreen -> StartScreen (index = 2)
                }}>{ navigation.getState()['index'] == 0 ? 1 : navigation.getState()['index'] == 2 ? 1 : 2 }</Text>
                <Text style={{
                    color: '#AAB2BD',
                    fontWeight: '700',
                    fontSize: 21,
                }}>/2</Text>
            </View>
            <TouchableOpacity 
                onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'MainScreen' }],
                        })}
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
