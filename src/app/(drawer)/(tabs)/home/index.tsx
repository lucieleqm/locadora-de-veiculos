import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageSlider } from '../../../../components/Image/ImageSlider'
import { VehicleDetails } from '../../../../components/Details/VehicleDetails'

// Botei alguns componentes aqui só pra visualizar como eles estão
export default function Home(){
    return (
      <View style={{ flex: 1}}>
        <ImageSlider/>
        <VehicleDetails/>
      </View>
    )
}

const styles = StyleSheet.create({})