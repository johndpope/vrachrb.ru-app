import { useRoute } from '@react-navigation/native';
import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native';
import CabinetCardWidget from '../components/Widgets/Cabinet/CabinetCardWidget';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard';

const DATA = [
    {
        id: 1,
        doctorName: "Педиатр",
        description: "Специалист для детей и подростков"
    },
    {
        id: 2,
        doctorName: "Терапевт",
        description: "Специалист общего профиля"
    },
    {
        id: 3,
        doctorName: "Гинеколог",
        description: "Женские заболевания"
    },
    {
        id: 4,
        doctorName: "Терапевт",
        description: "Специалист общего профиля"
    },
    {
        id: 5,
        doctorName: "Гинеколог",
        description: "Женские заболевания"
    },
    {
        id: 6,
        doctorName: "Терапевт",
        description: "Специалист общего профиля"
    },
    {
        id: 7,
        doctorName: "Гинеколог",
        description: "Женские заболевания"
    },
]

const CabinetScreen = () => {
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
                        <CabinetCardWidget data={ item }/>
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
      width: '100%',
    }
});

export default CabinetScreen
