import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  Foundation,
  FontAwesome
} from "@expo/vector-icons";
import React from "react";
import { theme } from "../../../styles/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarIconStyle:{
          justifyContent: 'center',
          top: 6
        },
        tabBarStyle: {
          backgroundColor: theme.colors.gray[100],
          borderColor: 'transparent',
          height:60,
          paddingTop: 5,
          paddingBottom: 5
        },
        tabBarActiveTintColor: theme.colors.gray[800],
        tabBarInactiveTintColor: theme.colors.gray[300],
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="locacoes/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="key-chain"
              color={color}
              size={29}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="veiculos/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="car" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="clientes/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, }) => (
            <Ionicons name="people" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="reparos/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct" color={color} size={29} />
          ),
        }}
      />
    </Tabs>
  );
}
