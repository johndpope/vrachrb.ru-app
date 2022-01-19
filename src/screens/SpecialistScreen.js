import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard';
import SpecialistCardWidget from '../components/Widgets/Specialist/SpecialistCardWidget';

const DATA = [
    {
        id: 1,
        name: "Елена Геннадьевна Иванова",
        specialty: "Специалист для детей и подростков",
        rating: 9.8,
        answer: 988
    },
    {
        id: 2,
        name: "Елена Геннадьевна Иванова",
        specialty: "Специалист для детей и подростков",
        rating: 9.8,
        answer: 988
    },
    {
        id: 3,
        name: "Елена Геннадьевна Иванова",
        specialty: "Специалист для детей и подростков",
        rating: 9.8,
        answer: 988
    },
    {
        id: 4,
        name: "Елена Геннадьевна Иванова",
        specialty: "Специалист для детей и подростков",
        rating: 9.8,
        answer: 988
    },
    {
        id: 5,
        name: "Елена Геннадьевна Иванова",
        specialty: "Специалист для детей и подростков",
        rating: 9.8,
        answer: 988
    },
    {
        id: 6,
        name: "Елена Геннадьевна Иванова",
        specialty: "Специалист для детей и подростков",
        rating: 9.8,
        answer: 988
    },
    {
        id: 7,
        name: "Елена Геннадьевна Иванова",
        specialty: "Специалист для детей и подростков",
        rating: 9.8,
        answer: 988
    },
]


const SpecialistScreen = () => {
    return (
        <View style={ styles.mainContent }>
            <FlatList 
                style={{
                    width: '100%',
                }}
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return(
                        <SpecialistCardWidget data={ item }/>
                    )
                }}
            />
            <BottomIssueCard />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%'
    }
});

export default SpecialistScreen
