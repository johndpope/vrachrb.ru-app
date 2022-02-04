import React, { Component } from 'react';
import { Text, View } from 'react-native';

const ProfileDataItem = ({ data, header }) => {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#AAB2BD', textTransform: 'uppercase' }}>{ header }</Text>
            <Text style={{ color: '#434A53' }}>{ data }</Text>
        </View>
    )
}

export default ProfileDataItem;
