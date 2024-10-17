import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import Veiculos from '../screens/Veiculos';
import Clientes from '../screens/Clientes';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
    return(
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'navy',
                tabBarInactiveTintColor: 'grey' 
            }}>
            <Tab.Screen 
                name="veiculos" 
                component={Veiculos}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => 
                    <Feather 
                    name="home" 
                    color={color} 
                    size={size}/>,   
                }}
            />
            <Tab.Screen 
                name="clientes" 
                component={Clientes}
                options={{
                    tabBarLabel: 'Clientes',
                    tabBarIcon: ({ color, size }) => 
                    <Feather 
                    name="users" 
                    color={color} 
                    size={size}/>,                 
                }}
            />
        </Tab.Navigator>
    )
}