import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard';
import SpecialistCardWidget from '../components/Widgets/Specialist/SpecialistCardWidget';
import ApiURL from '../requests/baseApiURL'
import Request from '../requests/Request'
import {useSelector} from "react-redux";


const SpecialistScreen = () => {

    const [specialist, setSpecialist] = useState()
    const [loading, setLoading] = useState(false)
    const specialistRoute = useSelector(state => state.SpecSlice.specialistRoute)
    const specialistData = useSelector(state => state.SpecSlice.specialistData)

    
    const getSpecialistData = async () => {
        setLoading(true)
        let rep = await Request.get(ApiURL + specialistRoute, specialistData)
        // console.log("REP::"+JSON.stringify(rep))

        setSpecialist(rep)
        setLoading(false)
    };

    useEffect(() => {
        getSpecialistData()
    }, [specialistData])


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
