import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormLocacao } from "../components/Form/FormLocacao";
import styles from "../styles/style";
import { useLocalSearchParams } from "expo-router";

export default function addLocacao() {
  const params = useLocalSearchParams();
  const veiculoId = Number(params.veiculoId);

  return (
    <SafeAreaView style={styles.container}>
      {veiculoId ? (
        <FormLocacao veiculoId={veiculoId} />
      ) : (
        <Text>ID do Veículo não encontrado</Text>
      )}
    </SafeAreaView>
  );
}
