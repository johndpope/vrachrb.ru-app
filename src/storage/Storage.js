import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

class Storage {
    static async save(key, value) {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // console.error('AsyncStorage#setItem error: ' + error.message);
        }
    }

    static async get(key) {
        return await AsyncStorage.getItem(key)
            .then((result) => {
                if (result) {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        // console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
                    }
                }
                return result;
            });
    }

    static async remove(key) {
        return await AsyncStorage.removeItem(key);
    }
}

export default Storage;
