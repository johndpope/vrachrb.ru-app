import React from "react";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
/**
 * Класс с Мультиплатформенными методами */
export class MultiPlatform {

    static ToastShow(msg){
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.LONG)
        } else {
            AlertIOS.alert(msg);
        }
    }
}