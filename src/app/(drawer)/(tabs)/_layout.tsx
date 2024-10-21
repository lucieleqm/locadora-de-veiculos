import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  Foundation,
  FontAwesome
} from "@expo/vector-icons";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarIconStyle:{
          justifyContent: 'center',
          top: 6
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
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
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="veiculos/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="car" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="clientes/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="reparos/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
