import React, { useState } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../../../../styles/style";
import { useRouter } from "expo-router"
import AddButton from "../../../../components/Button/AddButton";

export default function Reparos(){
  const router = useRouter();
    return (
      <SafeAreaView style={styles.container}>
        <AddButton onPress={()=>router.push('../../../add-reparo')}/>
      </SafeAreaView>
    )
}