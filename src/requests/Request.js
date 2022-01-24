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
                    'Content-Type': 'application/json',
                    'App-Platform': Platform.OS,
                },
                cache: 'no-cache',
                body: JSON.stringify(data),
            });

            let text = await response.text();
            if (__DEV__) {
                console.log('response ' + url, text);
            }
            return JSON.parse(text);
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

export default Request;
