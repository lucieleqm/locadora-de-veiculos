import { View, Text, } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormLocacao } from "../components/Form/FormLocacao";
import styles from "../styles/style";

export default function addLocacao() {
  return (
    <SafeAreaView style={styles.container}>
      <FormLocacao/>
    </SafeAreaView>
  );
}
