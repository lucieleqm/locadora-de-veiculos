import { Foundation } from "@expo/vector-icons";

import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ title: "" }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
          ),
          drawerLabel: "Home",
        }}
      />
    </Drawer>
  );
}
