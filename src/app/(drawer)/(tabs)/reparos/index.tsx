import React, { useState } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../../../../styles/style";
import { useRouter } from "expo-router"
import AddButton from "../../../../components/Button/AddButton";
import ListReparo from "../../../../components/List/ListReparo";

export default function Reparos(){
  const router = useRouter();
    return (
      <SafeAreaView style={styles.container}>
        <ListReparo></ListReparo>
        <AddButton onPress={()=>router.push('../../../add-reparo')}/>
      </SafeAreaView>
    )
}