import React, { useState } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Octicons } from "@expo/vector-icons";

import styles from "../../../../styles/style";
import ListCliente from "../../../../components/List/ListCliente";
import AddButton from "../../../../components/Button/AddButton";

export default function Clientes() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ListCliente></ListCliente>
      <AddButton onPress={() => router.push("../../../addCliente")}/>
    </SafeAreaView>
  );
}
