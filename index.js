import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Component } from "react";
import { Provider } from 'react-redux';
import { store } from './src/store'
import { name as appName } from './app.json';
/**
 * Корневой класс для инициализации магазина Redux */
class index extends Component {
    constructor(){
        super()
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => index);
