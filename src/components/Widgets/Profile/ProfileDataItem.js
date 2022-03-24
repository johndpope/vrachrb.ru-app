import React from 'react';
import { Text, View } from 'react-native';
import { MultiPlatform } from '../../MultiPlatform';

const ProfileDataItem = ({ data, header }) => {
    return (
        <View style={{ marginTop: MultiPlatform.AdaptivePixelsSize(20), marginLeft: MultiPlatform.AdaptivePixelsSize(20), marginRight: MultiPlatform.AdaptivePixelsSize(20) }}>
            <Text style={{ color: '#AAB2BD', fontSize: MultiPlatform.AdaptivePixelsSize(15) }}>{ header }</Text>
            <Text style={{ color: '#434A53', fontSize: MultiPlatform.AdaptivePixelsSize(17) }}>{ data }</Text>
        </View>
    )
}

export default ProfileDataItem;
