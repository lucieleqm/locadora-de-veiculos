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
        headerTitleStyle: { fontFamily: theme.fontFamily.bold },
        headerLeft: ({ tintColor }) => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
          >
            <MaterialIcons name="arrow-back-ios" size={30} color={tintColor} />
          </TouchableOpacity>
        ),
        headerShown: true,
      })}
    >
      <Stack.Screen
        name="addCliente"
        options={{ title: "Cadastrar Cliente" }}
      />
      <Stack.Screen name="addReparo" 
      options={{ title: "Adicionar Reparo" }} />
      <Stack.Screen
        name="addLocacao"
        options={{ title: "Adicionar Locação" }}
      />
      <Stack.Screen
        name="addVeiculo"
        options={{ title: "Cadastrar Veículo" }}
      />
    </Stack>
  );
}
