import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { theme } from "src/styles/theme";

import { useLocalSearchParams } from "expo-router";

import InfoVeiculo from "./[id]";
import Reparos from "./reparos";
import Locacoes from "./locacoes";

const Tab = createMaterialTopTabNavigator();

export default function DetalhesLayout() {
  const params = useLocalSearchParams();
  const veiculoId = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <Tab.Navigator
      initialRouteName="InfoVeiculo"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.gray[800],
        tabBarInactiveTintColor: theme.colors.gray[800],
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: theme.fontFamily.regular || "System",
          marginTop: 100,
        },
        tabBarStyle: {
          height: 10,
          backgroundColor: theme.colors.gray[100],
          justifyContent: "center",
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.blue,
          borderRadius: 2,
          height: 4,
        },
      }}
    >
      <Tab.Screen
        name="InfoVeiculo"
        component={InfoVeiculo}
        options={{ tabBarLabel: "Detalhes" }}
        initialParams={{ id: veiculoId }}
      />
      <Tab.Screen
        name="Reparos"
        component={Reparos}
        options={{ tabBarLabel: "Reparos" }}
        initialParams={{ id: veiculoId }}
      />
      <Tab.Screen
        name="Locacoes"
        component={Locacoes}
        options={{ tabBarLabel: "Locacoes" }}
        initialParams={{ id: veiculoId }}
      />
    </Tab.Navigator>
  );
}
