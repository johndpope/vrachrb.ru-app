import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native'
import ApiURL from '../requests/baseApiURL'
import Request from '../requests/Request'

const TestScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)

    const client = async () => {
        setLoading(!loading)
        let rep = await Request.post(ApiURL + "GetCabinet", {})
        
        setResponse(rep)
        setLoading(false)
    }

    return (
        <View style={ styles.mainContent }>
            { loading ? <ActivityIndicator size={'large'}/> : (
                <View>
                    <Button 
                        title="Test"
                        onPress={() => client()}
                    />
                    <Text style={{
                        color: 'black',
                        fontSize: 20
                    }}>{ response && response['response'][11]['title'] }</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
});

export default TestScreen
