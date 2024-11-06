import React from "react";
import { SafeAreaView} from "react-native";
import { useRouter } from "expo-router";

import styles from "../../../../styles/style";
import ListCliente from "../../../../components/List/ListCliente";
import AddButton from "../../../../components/Button/AddButton";

export default function Clientes() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ListCliente></ListCliente>
      <AddButton onPress={() => router.push("../../../add-cliente")}/>
    </SafeAreaView>
  );
}
