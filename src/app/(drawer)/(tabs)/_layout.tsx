import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs 
        screenOptions={{
            headerShown: false,
        }}>
      <Tabs.Screen
        name="home/index"
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
            name="clientes/index"
            options={{
                tabBarLabel: 'Clientes',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
            name="reparos/index"
            options={{
                tabBarLabel: 'Reparos',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="construct-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
            name="locacoes/index"
            options={{
                tabBarLabel: 'Locações',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="car-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}