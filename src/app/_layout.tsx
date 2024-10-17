/*import {Slot} from "expo-router";



export default function Layout() {
    return(
        <Slot/>
    )
}*/

import "../styles/global.css"
import { Ionicons } from '@expo/vector-icons';

import { Drawer } from 'expo-router/drawer';

export default function RootLayout() { 
  return (
    <Drawer screenOptions={{title: ''}}>
        <Drawer.Screen 
            name="(tabs)"
            options={{
                drawerIcon: ({ color, size }) => 
                    <Ionicons 
                    name="home" 
                    color={color} 
                    size={size}/>,
                drawerLabel: 'Home'
            }}/>
    </Drawer>
    /*<Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>*/
  );
}