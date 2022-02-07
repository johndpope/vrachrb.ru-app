import React, { Component } from 'react';
import { Text, View } from 'react-native';

const AnamnezCardItem = ({ item }) => {

    const itemsToRender = JSON.parse(item.value)

    return (
        <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <Text style={{ color: '#434A53', fontSize: 17, fontWeight: '700' }}>
                { item.title }
            </Text>
            {
                itemsToRender["bool"] ? itemsToRender["bool"] == "Нет" ? <Text style={{ color: 'black' }}>Нет</Text> : <Text style={{ color: 'black' }}>Да, { item.val }</Text> : 
                itemsToRender["choices"] ? itemsToRender["choices"].map(({item}) => {
                    return (
                        <Text style={{ color: 'black' }}>- { item }</Text>
                    )
                }) : <Text style={{ color: 'black' }}>{ itemsToRender.val }</Text>
            }
        </View>
    )
}

export default AnamnezCardItem;
