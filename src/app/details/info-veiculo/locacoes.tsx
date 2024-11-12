import { Text, SafeAreaView, View } from "react-native";
import React from "react";
import ListLocacao from "src/components/List/ListLocacao";
import { router, useLocalSearchParams } from "expo-router";
import styles from "src/styles/style";
import AddButton from "src/components/Button/AddButton";

export default function Locacoes() {
  const params = useLocalSearchParams();
  const veiculoId = Array.isArray(params.id)
    ? Number(params.id[0])
    : Number(params.id);

  console.log("veiculoId na tela Locacoes:", veiculoId);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textTitle}>Histórico de Locação</Text>
      </View>
      {veiculoId ? (
        <ListLocacao veiculoId={veiculoId} />
      ) : (
        <Text>ID não encontrado</Text>
      )}
      <AddButton
        onPress={() => router.push(`../../add-locacao?veiculoId=${veiculoId}`)}
      />
    </SafeAreaView>
  );
}
