import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VehicleList from "../../../../components/VehicleList";
import AddButton from "../../../../components/Button/AddButton";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
  return (
    <View className="flex-1 bg-grey-500 items-center justify-center">
      <VehicleList />
      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({});
