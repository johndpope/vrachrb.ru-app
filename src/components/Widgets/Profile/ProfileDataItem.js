import React from 'react';
import { Text, View } from 'react-native';
import { MultiPlatform } from '../../MultiPlatform';

const ProfileDataItem = ({ data, header }) => {
    return (
        <View style={{ margin: MultiPlatform.AdaptivePixelsSize(20) }}>
            <Text style={{ color: '#AAB2BD', textTransform: 'uppercase', fontSize: MultiPlatform.AdaptivePixelsSize(15) }}>{ header }</Text>
            <Text style={{ color: '#434A53', fontSize: MultiPlatform.AdaptivePixelsSize(19) }}>{ data }</Text>
        </View>
    )
}

export default ProfileDataItem;
