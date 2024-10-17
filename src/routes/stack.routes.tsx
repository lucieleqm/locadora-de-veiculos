import { createStackNavigator } from '@react-navigation/stack';

import Perfil from "../screens/Perfil";

const Stack = createStackNavigator();

export function StackRoutes() {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen 
                name='home' 
                component={Perfil}/>
        </Stack.Navigator>
    )   
}