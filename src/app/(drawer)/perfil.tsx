import React from "react";
import { SafeAreaView, Text } from "react-native";
import AddButton from "../../components/Button/AddButton";
import { useRouter } from "expo-router";

import styles from "../../styles/style";

export default function Perfil() {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <Text> Perfil</Text>
    </SafeAreaView>
  );
}

