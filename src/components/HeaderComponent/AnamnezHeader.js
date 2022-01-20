import React, { Component } from 'react';
import { Text, View } from 'react-native';

const AnamnezHeader = () => {
    return(
        <View style={{
            width: '100%',
            height: 65,
            backgroundColor: '#F3F4F6',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    color: '#434A53',
                    fontWeight: '700',
                    fontSize: 21,
                }}>1</Text>
                <Text style={{
                    color: '#AAB2BD',
                    fontWeight: '700',
                    fontSize: 21,
                }}>/2</Text>
            </View>
            <Text style={{
              color: '#434A53',
              fontWeight: '700',
              fontSize: 21,
              position: 'absolute',
              right: 10,
            }}>Отмена</Text>
        </View>
    )
}

export default AnamnezHeader;
