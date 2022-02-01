import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import CabinetCardWidget from '../components/Widgets/Cabinet/CabinetCardWidget';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard';
import ApiURL from '../requests/baseApiURL'
import Request from '../requests/Request'

const CabinetScreen = () => {
    const [cabinet, setCabinet] = useState()
    const [loading, setLoading] = useState(false)
    
    const getCabinetData = async () => {
        setLoading(true)
        let rep = await Request.get(ApiURL + "GetCabinet", {})
        // let rep = await fetch(ApiURL + "GetCabinet", {})

        setCabinet(rep)
        setLoading(false)
    };

    useEffect(() => {
        getCabinetData()
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
                                onRefresh={() => getCabinetData()}
                            />
                        }
                        style={{
                            width: '100%',
                        }}
                        data={cabinet && cabinet['response']}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return(
                                <CabinetCardWidget data={ item }/>
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
      width: '100%',
    }
});

export default CabinetScreen
