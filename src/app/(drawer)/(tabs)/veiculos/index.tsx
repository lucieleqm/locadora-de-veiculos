import React from "react";
import { SafeAreaView } from "react-native";
import ListVeiculo from "../../../../components/ListVeiculo";
import AddButton from "../../../../components/Button/AddButton";
import { useRouter } from "expo-router";

import styles from "../../../../styles/style";

export default function Home() {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <ListVeiculo />
      <AddButton onPress={()=>router.push('../../../(stack)/addVeiculo')} />
    </SafeAreaView>
  );
}

