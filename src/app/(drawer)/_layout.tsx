import React from "react";
import { TouchableOpacity} from "react-native";
import { Drawer } from "expo-router/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

export default function DrawerLayout() {
  const navigation = useNavigation();

  return (
    <Drawer
      screenOptions={{
        title: "",
        headerStyle: { backgroundColor: theme.colors.gray[800] },
        headerTintColor: theme.colors.gray[100],
        headerLeft: ({ tintColor }) => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={35} color={tintColor} />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={35} />
          ),
          drawerLabel: "Home",
        }}
      />
    </Drawer>
  );
}
