import { Tabs } from "expo-router";
import {
  Ionicons,
  Foundation,
  FontAwesome,
  MaterialIcons,
  FontAwesome6
} from "@expo/vector-icons";
import React from "react";
import { theme } from "../../../styles/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { 
          backgroundColor: theme.colors.gray[100],
        },
        headerTitleStyle: {
          marginLeft: 5,
          color: theme.colors.gray[800]
        },
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
      {/*<Tabs.Screen
        name="home/index"
        options={{
          headerShown: false,
          headerTitle: "",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={30} />
          ),
        }}
      />*/}
      <Tabs.Screen
        name="veiculos/index"
        options={{
          headerTitle: "Veículos",
          tabBarLabel: "Veículos",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="car" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="clientes/index"
        options={{
          headerTitle: "Clientes",
          tabBarLabel: "Clientes",
          tabBarIcon: ({ color, size, }) => (
            <Ionicons name="people" color={color} size={30} />
          ),
        }}
      />
       <Tabs.Screen
        name="locacoes/index"
        options={{
          headerTitle: "Contratos",
          tabBarLabel: "Contratos",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="key"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reparos/index"
        options={{
          headerTitle: "Reparos",
          tabBarLabel: "Reparos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct" color={color} size={29} />
          ),
        }}
      />
    </Tabs>
  );
}
