import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, RefreshControl, FlatList, StatusBar, Platform } from 'react-native';
import SpecialistCardWidget from '../components/Widgets/Specialist/SpecialistCardWidget';
import Request from '../requests/Request'
import {useDispatch, useSelector} from "react-redux";
import BaseSearchComponent from '../components/HeaderComponent/BaseSearchComponent';
import Routes from "../requests/Routes";
import { FlatList as FlatGestureList } from 'react-native-gesture-handler';
import { setBottomNavigationEnd } from '../store/reducers/UtilitySlice';
import { MultiPlatform } from '../components/MultiPlatform';
import { useNavigation } from '@react-navigation/native';

const SpecialistScreen = () => {

    const [specialist, setSpecialist] = useState()
    const [filteredSpecialist, setFilteredSpecialist] = useState()
    const [loading, setLoading] = useState(false)
    const specialistRoute = useSelector(state => state.SpecSlice.specialistRoute)
    const specialistData = useSelector(state => state.SpecSlice.specialistData)

    const [text, setText] = useState("")

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const getSpecialistData = (route = Routes.getSpecialistsURL, data= {}) => {
        setLoading(true)
        Request.get(route, data)
            .then(response => { setSpecialist(response), setFilteredSpecialist(response), setText(""), setLoading(false)})
    };

    const searchCabinetItem = (text) => {
        if (text !== ""){
            let data = specialist['response'].filter(specialist => {
                return (specialist.User.first_name + " " + specialist.User.second_name + " " + specialist.User.middle_name).toLocaleLowerCase().includes(text.toLocaleLowerCase())
            })
            setFilteredSpecialist({ 'response' : data })
        } else {
            setFilteredSpecialist(specialist)
        }
    }

    useEffect(() => {
        navigation.addListener(
            'focus',
            payload => {
                dispatch(setBottomNavigationEnd(false))
            }
        );
        getSpecialistData(specialistRoute, specialistData)
    }, [specialistData])

    return (
        <View style={ styles.mainContent }>
            {
                Platform.OS == 'ios' &&
                <StatusBar backgroundColor={"#F3F4F6"} />
            }
            { loading ? 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View> : 
                (
                <View style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <BaseSearchComponent value={text} setValue={setText} searchItem={searchCabinetItem}/>
                    {
                        Platform.OS == 'ios' ? 
                        (
                            <FlatGestureList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={loading}
                                        onRefresh={() => { getSpecialistData() }}
                                    />
                                }
                                style={{
                                    width: '100%',
                                }}
                                onScroll={(e) => {
                                    if ((e.nativeEvent.contentOffset.y + MultiPlatform.AdaptivePixelsSize(800)) > (filteredCabinet['response'].length * MultiPlatform.AdaptivePixelsSize(75) + 135)){
                                        dispatch(setBottomNavigationEnd(true))
                                    } else {
                                        dispatch(setBottomNavigationEnd(false))
                                    }
                                }}
                                data={filteredSpecialist && filteredSpecialist['response']}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item, index }) => {
                                    return(
                                        <View>
                                            <SpecialistCardWidget data={ item }/>
                                            {
                                                (index + 1) == filteredSpecialist['response'].length &&
                                                <View style={{
                                                    height: MultiPlatform.AdaptivePixelsSize(120),
                                                }}/>
                                            }
                                        </View>
                                    )
                                }} 
                            />
                        ) :
                        (
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
                                onScroll={(e) => {
                                    if ((e.nativeEvent.contentOffset.y + MultiPlatform.AdaptivePixelsSize(810)) > (filteredSpecialist['response'].length * MultiPlatform.AdaptivePixelsSize(120) + 110)){
                                        dispatch(setBottomNavigationEnd(true))
                                    } else {
                                        dispatch(setBottomNavigationEnd(false))
                                    }
                                }}                    
                                data={filteredSpecialist && filteredSpecialist['response']}
                                keyExtractor={(item) => item.id}
                                removeClippedSubviews={false}
                                renderItem={({ item, index }) => {
                                    return(
                                        <View>
                                            <SpecialistCardWidget data={ item }/>
                                            {
                                                (index + 1) == filteredSpecialist['response'].length &&
                                                <View style={{
                                                    height: MultiPlatform.AdaptivePixelsSize(110),
                                                }}/>
                                            }
                                        </View>
                                    )
                                }} 
                            />
                        )
                    }
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
