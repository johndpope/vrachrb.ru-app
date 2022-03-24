import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import Routes from '../requests/Routes';
import Request from '../requests/Request';
import { useDispatch } from "react-redux";
import {saveUserData, setAgreements} from "../store/reducers/LoginSlice";
import Storage from "../storage/Storage";
import {MultiPlatform} from "../components/MultiPlatform";

const SplashScreen = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const isAuth = async () => {
      let data = await Request.post(Routes.isAuthURL, {})

      if(data['response'] && data['response'] == true) {
          dispatch(saveUserData(data['userData']))
          await Storage.save("userData", data["userData"])
          navigation.reset({
              index: 0,
              routes: [{name: 'MainNavigationScreen'}],
          })
      } else {
          Request.get(Routes.getAgreementsURL, {})
              .then(result => {
                  dispatch(setAgreements(result["response"]))
                  // console.log("AGREEMENTS"+ JSON.stringify(result))
                  navigation.reset({
                      index: 0,
                      routes: [{name: 'AuthScreen'}],
                  })
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
                    height: MultiPlatform.AdaptivePixelsSize(83),
                    resizeMode: 'contain',
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
