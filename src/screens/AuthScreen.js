import React, { PropTypes, Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

const AuthScreen = (props) => {
  return (
    <View style={ styles.mainContent }>
        <StatusBar />
        <View style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
            <Image style={{
              resizeMode: 'cover',
              width: '70%',
              height: 100
            }} source={require("../images/logo.png")}></Image>
        </View>
        <View style={{
          flexBasis: '10%',
        }}>
          <TouchableOpacity style={ styles.authButtons }>
            <Text style={ styles.buttonText }>Авторизация</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.authButtons }>
            <Text style={ styles.buttonText }>Регистрация</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: "#E7F7F7",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  authButtons: {
    width: 250,
    height: 60,
    backgroundColor: "#7EDC88",
    justifyContent: 'center',
    alignItems: 'center',
    color: "#F8F8F8",
    borderRadius: 25,
    margin: 15
  },
  buttonText: {
    fontSize: 18
  }
});

export default AuthScreen;