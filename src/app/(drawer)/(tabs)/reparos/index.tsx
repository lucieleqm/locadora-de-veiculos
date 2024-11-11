import React from "react";
import { SafeAreaView } from "react-native";
import styles from "../../../../styles/style";
import { useRouter } from "expo-router"

import ListReparo from "../../../../components/List/ListReparo";

export default function Reparos(){
  const router = useRouter();
    return (
      <SafeAreaView style={styles.container}>
        <ListReparo></ListReparo>
      </SafeAreaView>
    )
}