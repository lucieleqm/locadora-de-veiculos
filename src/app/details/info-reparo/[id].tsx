import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ReparoDetails } from "../../../components/Details/ReparoDetails";

export default function InfoReparo() {
  const params = useLocalSearchParams();

  console.log("Parâmetros da URL:", params); 
  const reparoId = Array.isArray(params.id) ? params.id[0] : params.id; 
  console.log("ID da reparo:", reparoId);

  return (
    <View>
      {reparoId ? (
        <ReparoDetails id={reparoId} />
      ) : (
        <Text>ID não encontrado</Text>
      )}
    </View>
  );
}
