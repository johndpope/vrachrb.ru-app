import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native'
import ChoicesButtonBase from '../../components/AnamnezBaseComponent/ChoicesButtonBase';
import MultiTextBase from '../../components/AnamnezBaseComponent/MultiTextBase';
import QuestionTitleBase from '../../components/AnamnezBaseComponent/QuestionTitleBase';
import SingleTextBase from '../../components/AnamnezBaseComponent/SingleTextBase';
 
const DATA = [
    {
        id: 1, 
        header: <QuestionTitleBase question="Что беспокоит?" />,
        body: <MultiTextBase />
    },
    {
        id: 2,
        header: <QuestionTitleBase question="Повышенная температура?" />,
        body: <ChoicesButtonBase />
    },
    {
        id: 3,
        header: <QuestionTitleBase question="Какой ваш вес и возраст?" />,
        body: <SingleTextBase addText="" />
    },   
    {
        id: 4,
        header: <QuestionTitleBase question="Какой ваш вес и возраст?" additionalField="Боли, выделения, одышка, кашель, 
        покалывание, тремер, раздраженность, 
        изжога, отеки и т.д." />,
        body: <ChoicesButtonBase />
    },    
    {
        id: 5,
        header: <QuestionTitleBase question="Были травмы? Операции?" />,
        body: <ChoicesButtonBase />
    },
]

const QuestionsScreen = () => {
    return (
        <View style={ styles.mainContent }>
            <View style={{
                width: '85%',
            }}>
                <FlatList 
                    data={DATA}
                    style={{
                        width: '100%',
                    }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return(
                            <View style={{
                                marginBottom: 25,
                                marginTop: 25
                            }}>
                                { item.header }
                                { item.body }
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    }
})

export default QuestionsScreen;
