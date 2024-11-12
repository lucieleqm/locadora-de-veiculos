import React from "react";
import { SafeAreaView, Text } from "react-native";
import AddButton from "../../components/Button/AddButton";
import { useRouter } from "expo-router";
import ListBlack from "src/components/List/ListBlack";

import styles from "../../styles/style";

export default function Blacklist() {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{alignItems: 'center', padding: 10}}>
        <Text style={styles.textTitle}>BlackList</Text>
      </SafeAreaView>
      <ListBlack></ListBlack>
      <AddButton onPress={() => router.push("../../../add-blacklist")}/>
    </SafeAreaView>
  );
}

