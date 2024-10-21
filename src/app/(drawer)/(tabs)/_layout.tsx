import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  Foundation,
} from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
            <Fontisto name="motorcycle" color={color} size={size} />
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
