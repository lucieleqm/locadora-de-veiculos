import React from "react";
import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useFontLoader } from "../hooks/useFontLoader";
import { theme } from "../styles/theme";


export default function Layout() {

  const fontsLoaded = useFontLoader();
  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto"/>
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
        name="(drawer)"
        options={{ headerShown: false}}
      />
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
    </GestureHandlerRootView>
  );
}
