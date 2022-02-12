import React, { useEffect } from "react";
import { ToastAndroid, Platform, AlertIOS, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
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

    static AdaptivePixelsSize(size){
        let width = Dimensions.get('screen').width;
        let height = Dimensions.get('screen').height;

        if (width < height) {
            return RFValue(size, height)
        } else {
            return RFValue(size, width)
        }
    }

    static AdaptivePercentSize(size){
        let width = Dimensions.get('screen').width;
        let height = Dimensions.get('screen').height;

        if (width < height) {
            return RFPercentage(size, height)
        } else {
            return RFPercentage(size, width)
        }
    }
}