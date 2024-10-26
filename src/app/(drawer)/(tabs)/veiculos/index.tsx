import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VehicleList from "../../../../components/VehicleList";
import AddButton from "../../../../components/Button/AddButton";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter()
  return (
    <View className="flex-1 bg-grey-500 items-center justify-center">
      <VehicleList />
      <AddButton onPress={()=>router.push('../../../addVeiculo')} />
    </View>
  );
}

const styles = StyleSheet.create({});
