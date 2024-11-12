import React from "react";
import { SafeAreaView, Text } from "react-native";
import FormReparos from "../components/Form/FormReparos";
import styles from "../styles/style";
import { useLocalSearchParams } from "expo-router";

export default function addReparo() {
  const params = useLocalSearchParams();
  const veiculoId = Number(params.veiculoId);

  return (
    <SafeAreaView style={styles.container}>
      {veiculoId ? (
        <FormReparos veiculoId={veiculoId} />
      ) : (
        <Text>ID do Veículo não encontrado</Text>
      )}
    </SafeAreaView>
  );
}
