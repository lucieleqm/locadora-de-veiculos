import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { theme } from "../../styles/theme";

export default function StackLayout() {

  return (
    <Stack
      screenOptions={({ navigation }) => ({
        title: "",
        headerStyle: { backgroundColor: theme.colors.gray[100] },
        headerTintColor: theme.colors.gray[800],
        headerLeft: ({ tintColor }) => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
            <MaterialIcons name="arrow-back-ios" size={30} color={tintColor} />
          </TouchableOpacity>
        ),
      })}
    />
  );
}
