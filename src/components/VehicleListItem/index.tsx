import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./style";

interface VehicleListItemProps {
    name: string;
    price: string;
    details: string;
    image: any;
  }

export default function VehicleListItem({ name, price, details, image }: VehicleListItemProps)  { 

    return(
        <View style = {styles.cardVehicle}>
            <View>
                <Image source={image} style={styles.cardImage} />
            </View>
            <View style= {styles.cardInfosContainer}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.cardVehicleDetails}>{details}</Text>
                <Text style={styles.cardParagraph}>A partir de </Text>
                <Text style={styles.cardVehiclePrice}>R$ {price}/Semana</Text>
            </View>
            <Text ></Text>
        </View>
    );
}