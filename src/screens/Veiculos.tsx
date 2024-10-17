import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import VehicleListItem from "../components/VehicleListItem/"

export default function Veiculos() {
  return (
    <View>
      <VehicleListItem/>
      <Text>Veiculos!</Text>
    </View>
  );
}