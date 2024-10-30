import React from "react";
import { View, Text } from "react-native";
import styles from "./style";
import EditButton from "../../Button/EditButton";

export function VehicleDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleDetails}>Uma moto aí</Text>
      <View style={styles.infos}>
        <Text style={styles.infoDetails}>Ano: 2020</Text>
        <Text style={styles.infoDetails}>Cor: Prata</Text>
        <Text style={styles.infoDetails}>Preço: R$ 100,99</Text>
        <Text style={styles.infoDetails}>Cilindrada: 140 cc</Text>
      </View>
      <View style={styles.buttons}>
        <EditButton/>
      </View>
    </View>
  );
}
