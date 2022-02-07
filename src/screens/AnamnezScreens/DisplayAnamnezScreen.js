import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import AnamnezCardItem from '../../components/Widgets/Anamnez/AnamnezCardItem';

const DATA = {
    "response": [
        {
            "id": "112",
            "value":"{\"val\":\"\с\ф\ы\"}",
            "title": "Однострочное поле ввода"
        },
        {
            "id": "113",
            "value":"{\"val\":\"\Т\Е\К\С\Т\"}",
            "title": "Многострочное поле ввода"
        },
        {
            "id": "114",
            "value":"{\"val\":\"\ы\с\ф\",\"file\":\"c\\/2\\/a\\/71b2d-5293-8e11-098a-fc3af8a0b5cf.jpg;c\\/1\\/2\\/c0000-5adb-09d3-e883-8e6ebb9c6614.jpg\"}",
            "title": "Многострочное поле ввода с загрузкой"
        },
        {
            "id": "115",
            "value":"{\"bool\":\"\Н\е\т\",\"val\":\"\"}",
            "title": "НетДа  с однострочным полем ввода"
        },
        {
            "id": "116",
            "value":"{\"bool\":\"\Н\е\т\",\"val\":\"\Т\Е\К\С\Т \и \д\а \н\е\т\"}",
            "title": "НетДа  с многострочным полем ввода"
        },
        {
            "id": "117",
            "value":"{\"choices\":[\"\с\п\и\с\о\к\"]}",
            "title": "Список множ выбор"
        },
        {
            "id": "118",
            "value":"{\"choices\":[\"\в\ы\б\о\р\"]}",
            "title": "Список одно выбор"
        }
    ]
}

const DisplayAnamnezScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF'
        }}>
            <FlatList 
                style={{  width: '85%', marginTop: 20 }}
                data={DATA["response"]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <AnamnezCardItem item={ item } />
                    )
                }}
            />
        </View>
    )
}

export default DisplayAnamnezScreen;
