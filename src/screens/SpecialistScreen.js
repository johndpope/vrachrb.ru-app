import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard';
import SpecialistCardWidget from '../components/Widgets/Specialist/SpecialistCardWidget';
import ApiURL from '../requests/baseApiURL'
import Request from '../requests/Request'


const SpecialistScreen = () => {

    const [specialist, setSpecialist] = useState()
    const [loading, setLoading] = useState(false)
    
    const getSpecialistData = async () => {
        setLoading(true)
        let rep = await Request.post(ApiURL + "Specialist")
        // let rep = await fetch(ApiURL + "GetCabinet", {})

        setSpecialist(rep)
        setLoading(false)
    };

    useEffect(() => {
        getSpecialistData()
    }, [])


    return (
        <View style={ styles.mainContent }>
            { loading ? <ActivityIndicator size={'large'} /> : (
                <View style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <FlatList 
                        refreshControl={
                            <RefreshControl 
                                refreshing={loading}
                                onRefresh={() => getSpecialistData()}
                            />
                        }
                        style={{
                            width: '100%',
                        }}
                        data={specialist && specialist['response']}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return(
                                <SpecialistCardWidget data={ item }/>
                            )
                        }}
                    />
                    <BottomIssueCard />
                </View>
            )}
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
