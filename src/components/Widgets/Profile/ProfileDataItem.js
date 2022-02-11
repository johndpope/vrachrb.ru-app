import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MultiPlatform } from '../../MultiPlatform';

const ProfileDataItem = ({ data, header }) => {
    return (
        <View style={{ marginTop: MultiPlatform.AdaptivePixelsSize(20) }}>
            <Text style={{ color: '#AAB2BD', textTransform: 'uppercase', fontSize: MultiPlatform.AdaptivePixelsSize(15) }}>{ header }</Text>
            <Text style={{ color: '#434A53', fontSize: MultiPlatform.AdaptivePixelsSize(17) }}>{ data }</Text>
        </View>
    )
}

export default ProfileDataItem;
