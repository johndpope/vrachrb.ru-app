import React, { Component } from 'react';
import { Platform } from 'react-native';

class Request {
    static async post(url, data = "") {
        if (__DEV__) {
             console.log('request to ' + url, data);
        }
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    // 'Accept':       'application/json',
                    'Content-Type': 'application/json',
                    'App-Platform': Platform.OS,
                },
                cache: 'no-cache',
                body: JSON.stringify(data)
            });

            let text = await response.text();

            return JSON.parse(text);
        } catch (e) {
            return false;
        }
    }

    static async get(url, data) {
        if (__DEV__) {
             console.log('request to ' + url, data);
        }
        try {
            let params = Object.keys(data)
                .filter(function (key) {
                return data[key] ? true : false
                })
                .map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                })
                .join('&')

            let response = await fetch(url + "?" + params, {
                method: 'GET',
                headers: {
                    'Accept':       'application/json',
                    'Content-Type': 'application/json',
                    'App-Platform': Platform.OS,
                },
                cache: 'no-cache',
                // body: 'user=wefg&password=41235'
            });

            let text = await response.text();

            return JSON.parse(text);
        } catch (e) {
            return false;
        }
    }
}

export default Request;
