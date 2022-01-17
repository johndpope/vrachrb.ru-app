import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import AuthComponent from '../components/AuthComponent/AuthComponent';

const AuthScreen = ({navigation}) => {
  return (
    <View style={ styles.mainContent }>
        <StatusBar />
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
            style={ styles.imageStyle={} }
            source={require("../images/logo.png")} 
          />
        </View>
        <AuthComponent />
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
    width: 243,
    height: 83
  }
});

export default AuthScreen;