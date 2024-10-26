import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./style";
interface Veiculo {
    id: number;
    nome: string;
    preco: string;
    detalhes: string;
    imagem: any;
  }

export default function VehicleListItem({ nome, preco, detalhes, imagem }: Veiculo)  { 

    return(
        <View style = {styles.cardVehicle}>
            <View>
                <Image source={imagem} style={styles.cardImage} />
            </View>
            <View style= {styles.cardInfosContainer}>
                <Text style={styles.cardTitle}>{nome}</Text>
                <Text style={styles.cardVehicleDetails}>{detalhes}</Text>
                <Text style={styles.cardParagraph}>A partir de </Text>
                <Text style={styles.cardVehiclePrice}>R$ {preco}/Semana</Text>
            </View>
            <Text ></Text>
        </View>
    );
}