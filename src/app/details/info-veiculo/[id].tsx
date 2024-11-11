import { Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { VeiculoDetails } from "../../../components/Details/VehicleDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "src/styles/style";

export default function InfoVeiculo() {
  const params = useLocalSearchParams();

  //console.log("Parâmetros da URL:", params); 
  const veiculoId = Array.isArray(params.id) ? params.id[0] : params.id; 
  //console.log("ID da Locação:", veiculoId);

  return (
    <SafeAreaView style={styles.container}>
      {veiculoId ? (
        <VeiculoDetails id={veiculoId} />
      ) : (
        <Text>ID não encontrado</Text>
      )}
    </SafeAreaView>
  );
}
