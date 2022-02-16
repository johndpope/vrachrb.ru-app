import React from 'react';
import { StatusBar, StyleSheet, Image, View } from 'react-native';
import AuthComponent from '../components/AuthComponent/AuthComponent';
import { MultiPlatform } from '../components/MultiPlatform';

const AuthScreen = () => {
  return (
    <View style={ styles.mainContent }>
      <StatusBar />
        <View style={{
          width: '100%',
          height: '100%',
          justifyContent: 'space-around'
        }}>
          <View style={{
            flex: 0.1,
            opacity: 0.3
          }}>
  
          </View>
            <View style={{
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Image
              style={ styles.imageStyle }
              source={require("../images/logo.png")} 
            />
          </View>
          <AuthComponent />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around'
  },
  imageStyle: {
    width: MultiPlatform.AdaptivePixelsSize(243),
    height: MultiPlatform.AdaptivePixelsSize(83)
  }
});

export default AuthScreen;