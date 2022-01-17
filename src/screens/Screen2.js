import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

const Screen2 = () => {
    return (
        <View style={ styles.mainContent }>
            <Text>Hello, world screen2!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
});

export default Screen2
