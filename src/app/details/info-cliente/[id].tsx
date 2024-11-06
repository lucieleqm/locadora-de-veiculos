import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ClienteDetails } from "../../../components/Details/ClienteDetails";

export default function InfoCliente() {
  const params = useLocalSearchParams();

  console.log("Parâmetros da URL:", params); 
  const clienteId = Array.isArray(params.id) ? params.id[0] : params.id; 
  console.log("ID da Cliente:", clienteId);

  return (
    <View>
      {clienteId ? (
        <ClienteDetails id={clienteId} />
      ) : (
        <Text>ID não encontrado</Text>
      )}
    </View>
  );
}
