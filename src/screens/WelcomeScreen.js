import React, { PropTypes, Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const WelcomeScreen = (props) => {
  return (
    <View style={ styles.mainContent }>
        <View>
            <Text style={{
                fontSize: 20
            }}>Hello</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default WelcomeScreen;