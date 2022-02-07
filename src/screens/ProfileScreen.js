import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProfileDataItem from '../components/Widgets/Profile/ProfileDataItem';
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';
import LoginSlice from '../store/reducers/LoginSlice';

const ProfileScreen = () => {

    const navigation = useNavigation()
    const selectData = useSelector(state => state.LoginSlice.userData)

    const logOut = async () => {
        let response = await Request.get(baseApiURL + "SignOut", {})

        navigation.reset({
            index: 0,
            routes: [{ name: 'AuthScreen' }],
        })
        // console.log(selectData)
    }

    return (
        <View style={ styles.mainContent }>
            <View style={{
                flex: 1,
                backgroundColor: '#E5E5E5'
            }}>
            </View>
            <View style={{
                flex: 2.2,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <Image style={{
                    width: 230,
                    height: 230,
                    borderRadius: 200,
                    position: 'absolute',
                    top: '-30%'
                }} source={{ uri: baseURL + "u/i/2/7/a/1.png" }} />
                <Text style={{ color: 'black', fontSize: 17 }}>{ selectData.first_name + " " +
                    selectData.second_name + " " + selectData.middle_name }</Text>
                <View style={{ width: '85%', marginTop: 30}}>
                    <ProfileDataItem header="Ваш Email" data={ selectData.email } />
                    <ProfileDataItem header="Ваш дата рождения" data={ selectData.birth_date.split(" ")[0] } />
                    <ProfileDataItem header="Ваш номер телефона" data={ selectData.phone } />
                </View>
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
