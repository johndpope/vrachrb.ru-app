import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import CabinetCardWidget from '../components/Widgets/Cabinet/CabinetCardWidget';
import ApiURL from '../requests/baseApiURL'
import Request from '../requests/Request'

const CabinetScreen = () => {
    const [cabinet, setCabinet] = useState()
    const [loading, setLoading] = useState(false)
    
    const getCabinetData = () => {
        setLoading(true)
        Request.get(ApiURL + "GetCabinet", {})
            .then(response => { setCabinet(response), setLoading(false)})
    };

    useEffect(() => {
        getCabinetData()
    }, [])

    return (
        <View style={ styles.mainContent }>
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
                        data={cabinet && cabinet['response']}
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
    }
});

export default CabinetScreen
