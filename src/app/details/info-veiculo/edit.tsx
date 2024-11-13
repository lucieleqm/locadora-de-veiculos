import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "src/styles/style";
import { EditVeiculo } from "../../../components/Edit/EditVeiculo"; // Garanta que o caminho está correto

export default function EditVeiculoScreen() {
  const params = useLocalSearchParams();
  const veiculoId = Array.isArray(params.id) ? params.id[0] : params.id;
  console.log("ID:", veiculoId);

  return (
    <SafeAreaView style={styles.container}>
      {veiculoId ? (
        <EditVeiculo id={veiculoId} /> // Passa o id corretamente
      ) : (
        <Text>ID não encontrado</Text>
      )}
    </SafeAreaView>
  );
}
