import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl, Text, TextInput } from 'react-native';
import BaseSearchComponent from '../components/HeaderComponent/BaseSearchComponent';
import CabinetCardWidget from '../components/Widgets/Cabinet/CabinetCardWidget';
import ApiURL from '../requests/baseApiURL'
import Request from '../requests/Request'

const CabinetScreen = () => {

    const [cabinet, setCabinet] = useState()
    const [filteredCabinet, setFilteredCabinet] = useState()
    const [loading, setLoading] = useState(false)

    const [text, setText] = useState("")

    const getCabinetData = () => {
        setLoading(true)
        Request.get(ApiURL + "GetCabinet", {})
            .then(response => { setCabinet(response), setLoading(false), setFilteredCabinet(response), setText("")})
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
            <BaseSearchComponent value={text} setValue={setText} searchItem={searchCabinetItem}/>
            { loading ? <ActivityIndicator size={'large'} /> : (
                <View style={{ width: '100%', height: '100%' }}>
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
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return(
                                <CabinetCardWidget data={ item }/>
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
      width: '100%',
      height: '100%'
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

export default CabinetScreen
