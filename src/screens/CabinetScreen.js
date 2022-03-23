import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator, RefreshControl, FlatList, Platform, StatusBar } from 'react-native';
import BaseSearchComponent from '../components/HeaderComponent/BaseSearchComponent';
import CabinetCardWidget from '../components/Widgets/Cabinet/CabinetCardWidget';
import Request from '../requests/Request'
import Routes from "../requests/Routes";
import { FlatList as FlatGestureList } from 'react-native-gesture-handler';
import BottomIssueCard from '../components/Widgets/Specialist/BottomIssueCard'

const CabinetScreen = () => {

    const [cabinet, setCabinet] = useState()
    const [filteredCabinet, setFilteredCabinet] = useState()
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const [text, setText] = useState("")

    const getCabinetData = () => {
        setLoading(true)
        Request.get(Routes.getCabinetURL, {})
            .then(response => { setCabinet(response), setLoading(false), setFilteredCabinet(response), setText("")})
        setVisible(false)
    };

    const searchCabinetItem = (text) => {
        let data = cabinet['response'].filter(cabinet => {
            return cabinet.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        })

        setFilteredCabinet({ 'response' : data })
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
                                onEndReached={() => setVisible(true)}
                                data={filteredCabinet && filteredCabinet['response']}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return(
                                        <CabinetCardWidget data={ item }/>
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
                                onEndReached={() => setVisible(true)}
                                data={filteredCabinet && filteredCabinet['response']}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return(
                                        <CabinetCardWidget data={ item }/>
                                    )
                                }}
                            />
                        )
                    }
                    <BottomIssueCard show={visible}/>
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
