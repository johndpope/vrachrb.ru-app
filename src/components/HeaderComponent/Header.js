import { useNavigation } from '@react-navigation/native'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const Header = () => {
    const navigation = useNavigation()

    return (
      <View style={{
        width: '100%',
        height: 65,
        backgroundColor: '#F3F4F6',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <Text style={{
          color: '#434A53',
          fontWeight: '700',
          fontSize: 21,
          marginTop: 24,
          marginLeft: 24
        }}>Консультация врача</Text>
        {/* <TouchableOpacity style={{ margin: 10 }} title='gedgh'>
          <Image style={{ width: 45, height: '100%' }} source={ require('../../images/shevron_gradient.png') }/>
        </TouchableOpacity> */}
      </View>
    )
}

export default Header
