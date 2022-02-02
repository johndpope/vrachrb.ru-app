import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';

const ProfileScreen = () => {

    const navigation = useNavigation()

    const logOut = async () => {
        let response = await Request.get(baseApiURL + "SignOut", {})

        navigation.reset({
            index: 0,
            routes: [{ name: 'AuthScreen' }],
        })
    }

    return (
        <View style={ styles.mainContent }>
            <View style={{
                flex: 1,
            }}>

            </View>
            <View style={{
                flex: 2,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}>
                <Image style={{
                    width: 230,
                    height: 230,
                    borderRadius: 200,
                    position: 'absolute',
                    top: '-30%'
                }} source={ require('../images/oval.png') } />
                <Button 
                    title='Выход'
                    onPress={() => logOut()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        width: '100%',
    }
})

export default ProfileScreen;
