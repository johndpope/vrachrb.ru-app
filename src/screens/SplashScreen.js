import { useNavigation } from '@react-navigation/native';
import React, { Component, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Routes from '../requests/Routes';
import Request from '../requests/Request';
import { useDispatch } from "react-redux";
import { saveUserData } from "../store/reducers/LoginSlice";
import Storage from "../storage/Storage";

const SplashScreen = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const isAuth = async () => {
      let data = await Request.post(Routes.isAuthURL, {})

      if(data['response'] && data['response'] == true) {
          // console.log("AUTH::"+JSON.stringify(data))
          dispatch(saveUserData(data['userData']))
          await Storage.save("userData", data["userData"])
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
