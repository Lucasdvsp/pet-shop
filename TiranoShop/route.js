import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screens/login'
import Cadastro from './screens/cadastro'
import Home from './screens/home'
import Notificacoes from './screens/notificacoes'
import Perfil from './screens/perfil'

const Stack = createNativeStackNavigator();

export default function Route(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Cadastro' screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name='Cadastro'
                    component={Cadastro}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='Notificacoes'
                    component={Notificacoes}
                />
                <Stack.Screen
                    name="Perfil"
                    component={Perfil}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}