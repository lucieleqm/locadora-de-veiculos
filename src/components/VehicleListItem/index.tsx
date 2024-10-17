import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./style";

export default function VehicleListItem() {
    return(
        <View>
            <Image source={require('../../assets/images/car1.png')} 
            style = {styles.vehicleImage}/>
            
            <Text >CALCULADORA DE IMC</Text>
        </View>
    );
}