import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const TestScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")

    let dataFromServer = ""

    const client = async () => {
        return await fetch("http://locgergralhost:3232/api/GetCabinet")
            .then((response) => response.json())
            .then(json => {
                dataFromServer = setResponse(json['response'][0]['title']);
                () => setResponse(dataFromServer)
            })
    }

    return (
        <View style={ styles.mainContent }>
            <Text styles={{
                color: 'black',
                fontSize: 20
            }}>response</Text>
            <Button 
                title="Test"
                onPress={() => client()}
            />
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
