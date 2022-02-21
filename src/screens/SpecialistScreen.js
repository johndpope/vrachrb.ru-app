import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, View, ActivityIndicator, RefreshControl } from 'react-native';
import SpecialistCardWidget from '../components/Widgets/Specialist/SpecialistCardWidget';
import Request from '../requests/Request'
import {useSelector} from "react-redux";
import BaseSearchComponent from '../components/HeaderComponent/BaseSearchComponent';
import Routes from "../requests/Routes";
import { FlatList } from 'react-native-gesture-handler';


const SpecialistScreen = () => {

    const [specialist, setSpecialist] = useState()
    const [filteredSpecialist, setFilteredSpecialist] = useState()
    const [loading, setLoading] = useState(false)
    const specialistRoute = useSelector(state => state.SpecSlice.specialistRoute)
    const specialistData = useSelector(state => state.SpecSlice.specialistData)

    const [text, setText] = useState("")

    const getSpecialistData = (route = Routes.getSpecialistsURL, data= {}) => {
        setLoading(true)
        Request.get(route, data)
            .then(response => { setSpecialist(response), setLoading(false), setFilteredSpecialist(response), setText("")})
    };

    const searchCabinetItem = (text) => {
        let data = specialist['response'].filter(specialist => {
            return (specialist.User.first_name + " " + specialist.User.second_name + " " + specialist.User.middle_name).toLocaleLowerCase().includes(text.toLocaleLowerCase())
        })

        setFilteredSpecialist({ 'response' : data })
    }

    useEffect(() => {
        getSpecialistData(specialistRoute, specialistData)
    }, [specialistData])


    return (
        <View style={ styles.mainContent }>
            { loading ? <ActivityIndicator size={'large'} /> : (
                <View style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <BaseSearchComponent value={text} setValue={setText} searchItem={searchCabinetItem}/>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() => { getSpecialistData() }}
                            />
                        }
                        style={{
                            width: '100%',
                        }}
                        data={filteredSpecialist && filteredSpecialist['response']}
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
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%',
      height: '100%'
    }, 
});

export default SpecialistScreen
