import React from "react";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
/**
 * Класс для работы с AsyncStorage
 * @description
 * Имеет статические поля и методы для работы с стором*/
export class MultiPlatform {

    static ToastShow(msg){
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.LONG)
        } else {
            AlertIOS.alert(msg);
        }
    }
}