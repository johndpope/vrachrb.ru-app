import { useNavigation } from '@react-navigation/native';
import React, { Component, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';
import {useDispatch} from "react-redux";
import {loadUserData} from "../store/reducers/LoginSlice";

const SplashScreen = () => {

    const navigation = useNavigation()

    const isAuth = async () => {
      let data = await Request.post(baseApiURL + "Is_auth", {})

      if(data['response'] && data['response'] == true) {
          navigation.reset({
              index: 0,
              routes: [{name: 'MainNavigationScreen'}],
          })
      } else {
          navigation.reset({
              index: 0,
              routes: [{name: 'AuthScreen'}],
          })
      }
    }
  
    useLayoutEffect(() => {
      isAuth()
    }, [])
 
    return (
        <View style={styles.mainContent}>
            <Image 
                style={{
                    width: 243,
                    height: 83
                }}
                source={ require('../images/logo.png') }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }, 
})

export default SplashScreen;
