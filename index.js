import React from 'react';
import { AppRegistry, KeyboardAvoidingView, Platform } from 'react-native';
import App from './App';
import { Component } from "react";
import { Provider } from 'react-redux';
import { store } from './src/store'
import { name as appName } from './app.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation';
/**
 * Корневой класс для инициализации магазина Redux */

class index extends Component {
    constructor(){
        super()
        Platform.OS == 'android' && Orientation.lockToPortrait()
    }

    render() {
        return (
            <Provider store={store}>
                <SafeAreaView style={{ flex: 1 }}>
                    <App/>
                </SafeAreaView>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => index);
