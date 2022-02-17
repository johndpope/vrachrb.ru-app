import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard';
import SpecialistCardWidget from '../components/Widgets/Specialist/SpecialistCardWidget';
import ApiURL from '../requests/baseApiURL'
import Request from '../requests/Request'
import {useSelector} from "react-redux";
import BaseSearchComponent from '../components/HeaderComponent/BaseSearchComponent';


const SpecialistScreen = () => {

    const [specialist, setSpecialist] = useState()
    const [filteredSpecialist, setFilteredSpecialist] = useState()
    const [loading, setLoading] = useState(false)
    const specialistRoute = useSelector(state => state.SpecSlice.specialistRoute)
    const specialistData = useSelector(state => state.SpecSlice.specialistData)

    const [text, setText] = useState("")

    const getSpecialistData = (route = "GetSpecialists", data= {}) => {
        setLoading(true)
        Request.get(ApiURL + route, data)
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
            <BaseSearchComponent value={text} setValue={setText} searchItem={searchCabinetItem}/>
            { loading ? <ActivityIndicator size={'large'} /> : (
                <View style={{
                    width: '100%',
                    height: '100%'
                }}>
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%'
    }, 
    mainInputWrapper: { 
        width: '100%', 
        height: 90, 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        marginTop: 15 
    },
    textInputStyle: { 
        backgroundColor: '#F3F4F6', 
        paddingLeft: 15, 
        width: '95%',
        height: 40, 
        marginTop: 45, 
        borderRadius: 30, 
        color: '#434A53', 
        fontSize: 15 
    }
});

export default SpecialistScreen
