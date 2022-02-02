import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
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
            <Button 
                title='Выход'
                onPress={() => logOut()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    }
})

export default ProfileScreen;
