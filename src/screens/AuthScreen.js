import React from 'react';
import { StatusBar, StyleSheet, Image, View } from 'react-native';
import AuthComponent from '../components/AuthComponent/AuthComponent';
import { MultiPlatform } from '../components/MultiPlatform';
import { colors } from '../styles/colors';

const AuthScreen = () => {

  return (
    <View style={ styles.mainContent }>
        <StatusBar />
        <View style={ styles.wrapperBlock }>
          <View style={styles.subWrapperBlock}/>
            <View style={ styles.mainLoginBlock }>
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
    backgroundColor: colors.BG_COLOR_WHITE,
    justifyContent: 'space-around'
  },
  wrapperBlock: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around'
  },
  subWrapperBlock: {
    flex: 0.1,
    opacity: 0.3
  },
  mainLoginBlock: {
    alignItems: 'center',
    alignContent: 'center',
  },
  imageStyle: {
    width: MultiPlatform.AdaptivePixelsSize(250),
    height: MultiPlatform.AdaptivePixelsSize(83)
  }
});

export default AuthScreen;
