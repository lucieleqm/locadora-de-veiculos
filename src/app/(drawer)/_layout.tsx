import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import {
  Feather,
  FontAwesome6,
  Foundation,
  Ionicons,
} from "@expo/vector-icons";
import { theme } from "../../styles/theme";
import { SafeAreaView, Image, Text } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";

export default function DrawerLayout() {
  const navigation = useNavigation();

  return (
    <Drawer
      screenOptions={{
        title: "",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.gray[800] },
        headerTintColor: theme.colors.gray[100],
        drawerStyle: { backgroundColor: theme.colors.gray[100] },
        drawerActiveTintColor: theme.colors.gray[800],
        drawerInactiveTintColor: theme.colors.gray[500],
        headerLeft: ({ tintColor }) => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={35} color={tintColor} />
          </TouchableOpacity>
        ),
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 230,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.gray[800],
                paddingTop: 15
              }}
            >
              <Image
                source={require("../../assets/images/user3.jpg")}
                resizeMode="contain"
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 55,
                }}
              />
              <Text 
              style={{ 
                fontSize: 18, 
                fontFamily: theme.fontFamily.medium,
                color: theme.colors.gray[100],
                marginVertical: 8 
                }}>
                Mariana Carneiro
              </Text>
              <Text 
              style={{
                fontFamily: theme.fontFamily.regular,
                fontSize: 16,
                color: theme.colors.gray[200]
              }}>
                Admin
              </Text>
            </View>
            <DrawerItemList {...props}/>
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={30} />
          ),
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="perfil"
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={30} />
          ),
          drawerLabel: "Perfil",
        }}
      />
      <Drawer.Screen
        name="blacklist"
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="skull" color={color} size={28} />
          ),
          drawerLabel: "Blacklist",
        }}
      />
    </Drawer>
  );
}
