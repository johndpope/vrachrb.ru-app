import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

const Screen1 = () => {
    return (
        <View style={ styles.mainContent }>
            <Text>Hello, world screen1!</Text>
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

export default Screen1
