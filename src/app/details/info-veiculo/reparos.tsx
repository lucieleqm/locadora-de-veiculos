import { Text, SafeAreaView, View } from "react-native";
import React from "react";
import ListReparo from "src/components/List/ListReparo";
import { router, useLocalSearchParams } from "expo-router";
import styles from "src/styles/style";
import AddButton from "src/components/Button/AddButton";

export default function Reparos() {
  const params = useLocalSearchParams();
  const veiculoId = Array.isArray(params.id)
    ? Number(params.id[0])
    : Number(params.id);

  console.log("veiculoId na tela Reparos:", veiculoId);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>Histórico de Manutenção</Text>
      </View>
      {veiculoId ? (
        <ListReparo veiculoId={veiculoId} />
      ) : (
        <Text>ID não encontrado</Text>
      )}
      <AddButton
        onPress={() => router.push(`../../add-reparo?veiculoId=${veiculoId}`)}
      />
    </SafeAreaView>
  );
}
