import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { VeiculoDetails } from "../../../components/Details/VehicleDetails";

export default function InfoVeiculo() {
  const params = useLocalSearchParams();

  console.log("Parâmetros da URL:", params); 
  const veiculoId = Array.isArray(params.id) ? params.id[0] : params.id; 
  console.log("ID da Locação:", veiculoId);

  return (
    <View>
      {veiculoId ? (
        <VeiculoDetails id={veiculoId} />
      ) : (
        <Text>ID não encontrado</Text>
      )}
    </View>
  );
}
