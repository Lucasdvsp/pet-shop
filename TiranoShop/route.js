import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screens/login'
import Cadastro from './screens/cadastro'
import Home from './screens/home'
import Notificacoes from './screens/notificacoes'
import Perfil from './screens/perfil'
import { observarUsuario } from './src/services/authService'

const Stack = createNativeStackNavigator();

export default function Route(){
    // undefined = ainda verificando a sessão | null = deslogado | objeto = logado
    const [usuario, setUsuario] = useState(undefined);

    useEffect(()=>{
        const cancelar = observarUsuario(setUsuario);
        return cancelar;
    }, [])

    if (usuario === undefined) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F2F3'}}>
                <ActivityIndicator size='large' color='#56A765'/>
            </View>
        )
    }

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {usuario ? (
                    // TELAS DE QUEM ESTÁ LOGADO (a Home é a primeira)
                    <>
                        <Stack.Screen name='Home' component={Home}/>
                        <Stack.Screen name='Notificacoes' component={Notificacoes}/>
                        <Stack.Screen name='Perfil' component={Perfil}/>
                    </>
                ) : (
                    // TELAS DE QUEM NÃO ESTÁ LOGADO
                    <>
                        <Stack.Screen name='Cadastro' component={Cadastro}/>
                        <Stack.Screen name='Login' component={Login}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}