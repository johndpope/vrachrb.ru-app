import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator, RefreshControl, FlatList, Platform, StatusBar } from 'react-native';
import BaseSearchComponent from '../components/HeaderComponent/BaseSearchComponent';
import CabinetCardWidget from '../components/Widgets/Cabinet/CabinetCardWidget';
import Request from '../requests/Request'
import Routes from "../requests/Routes";
import { FlatList as FlatGestureList } from 'react-native-gesture-handler';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard'
import { useDispatch } from 'react-redux';
import { setBottomNavigationEnd } from '../store/reducers/UtilitySlice';
import { MultiPlatform } from '../components/MultiPlatform';

const CabinetScreen = () => {

    const [cabinet, setCabinet] = useState()
    const [filteredCabinet, setFilteredCabinet] = useState()
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("")

    const dispatch = useDispatch()

    const getCabinetData = () => {
        setLoading(true)
        Request.get(Routes.getCabinetURL, {})
            .then(response => { setCabinet(response), setFilteredCabinet(response), setText(""), setLoading(false)})
        dispatch(setBottomNavigationEnd(false))
    };

    const searchCabinetItem = (text) => {
        if (text !== ""){
            let data = cabinet['response'].filter(cabinet => {
                return cabinet.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
            })
            setFilteredCabinet({ 'response' : data })
        } else {
            setFilteredCabinet(cabinet)
        }
    }

    useEffect(() => {
        getCabinetData()
    }, [])

    return (
        <View style={ styles.mainContent }>
            {
                Platform.OS == 'ios' &&
                <StatusBar backgroundColor={"#F3F4F6"} />
            }
            { loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>  : (
                <View style={{ width: '100%', height: '100%' }}>
                    <BaseSearchComponent value={text} setValue={setText} searchItem={searchCabinetItem}/>
                    {
                        Platform.OS == 'ios' ?
                        (
                            <FlatGestureList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={loading}
                                        onRefresh={() => getCabinetData()}
                                    />
                                }
                                style={{
                                    width: '100%',
                                }}                                
                                onScroll={(e) => {
                                    if ((e.nativeEvent.contentOffset.y + MultiPlatform.AdaptivePixelsSize(780)) > (filteredCabinet['response'].length * MultiPlatform.AdaptivePixelsSize(75) + 135)){
                                        dispatch(setBottomNavigationEnd(true))
                                    } else {
                                        dispatch(setBottomNavigationEnd(false))
                                    }
                                }}
                                data={filteredCabinet && filteredCabinet['response']}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item, index }) => {
                                    return(
                                        <View>
                                            <CabinetCardWidget data={ item }/>
                                            {
                                                (index + 1) == filteredCabinet['response'].length &&
                                                <BottomIssueCard />
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
                                        onRefresh={() => getCabinetData()}
                                    />
                                }
                                style={{
                                    width: '100%',
                                }}
                                data={filteredCabinet && filteredCabinet['response']}
                                showsVerticalScrollIndicator={false}
                                onScroll={(e) => {
                                    if ((e.nativeEvent.contentOffset.y + MultiPlatform.AdaptivePixelsSize(780)) > (filteredCabinet['response'].length * MultiPlatform.AdaptivePixelsSize(75) + 135)){
                                        dispatch(setBottomNavigationEnd(true))
                                    } else {
                                        dispatch(setBottomNavigationEnd(false))
                                    }
                                }}
                                keyExtractor={(item) => item.id}
                                removeClippedSubviews={false}
                                renderItem={({ item, index }) => {
                                    return(
                                        <View>
                                            <CabinetCardWidget data={ item }/>
                                            {
                                                (index + 1) == filteredCabinet['response'].length &&
                                                <BottomIssueCard />
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%',
      height: '100%'
    },
});

export default CabinetScreen
