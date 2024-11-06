import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { LocacaoDetails } from "../../../components/Details/LocacaoDetails";

export default function InfoLocacao() {
  const params = useLocalSearchParams();

  console.log("Parâmetros da URL:", params); 
  const locacaoId = Array.isArray(params.id) ? params.id[0] : params.id; 
  console.log("ID da Locação:", locacaoId);

  return (
    <View>
      {locacaoId ? (
        <LocacaoDetails id={locacaoId} />
      ) : (
        <Text>ID não encontrado</Text>
      )}
    </View>
  );
}
