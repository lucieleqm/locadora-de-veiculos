import React, { useState } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Octicons } from "@expo/vector-icons";

import styles from "../../../../styles/style";
import ListCliente from "../../../../components/ListCliente";
import AddButton from "../../../../components/Button/AddButton";

export default function Clientes() {
  const router = useRouter();
  const [clienteLoc, setClienteLoc] = useState([
    {
      id: "1",
      name: "Gabriel",
      phone: "(11) 99999-9999",
      cpf: "XXX.XXX.XXX-XX",
    },
    {
      id: "2",
      name: "João",
      phone: "(11) 99999-9999",
      cpf: "XXX.XXX.XXX-XX",
    },
    {
      id: "3",
      name: "Lucas",
      phone: "(11) 99999-9999",
      cpf: "XXX.XXX.XXX-XX",
    },
    {
      id: "4",
      name: "Carlos",
      phone: "(11) 99999-9999",
      cpf: "XXX.XXX.XXX-XX",
    },
    {
      id: "5",
      name: "Bento",
      phone: "(11) 99999-9999",
      cpf: "XXX.XXX.XXX-XX",
    },
    {
      id: "6",
      name: "Benta",
      phone: "(11) 99999-9999",
      cpf: "XXX.XXX.XXX-XX",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ListCliente></ListCliente>
      <AddButton onPress={() => router.push("../../../addCliente")}/>
    </SafeAreaView>
/*
<SafeAreaView style={styles.boxMain}>
<Text style={styles.textTitle}>Clientes</Text>
<SafeAreaView style={styles.boxFlatList}>
  <FlatList
    data={clienteLoc}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity style={styles.boxList}>
        <Text style={styles.textListType}>{item.name}</Text>
        <Text style={styles.textListItem}>{item.phone}</Text>
        <Text style={styles.textListItem}>{item.cpf}</Text>
      </TouchableOpacity>
    )}
  ></FlatList>
</SafeAreaView>
</SafeAreaView>
*/
  );
}
