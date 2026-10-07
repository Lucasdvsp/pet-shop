import {useState} from 'react'
import {ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image} from 'react-native'
import {entrar, traduzirErro} from '../src/services/authService'

export default function Login({navigation}){
    const logo = require('../assets/logotipo para pet shop azul e rosa.png');
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [carregando, setCarregando] = useState(false)

    async function handleLogin(){
        if (!email.trim() || !senha) {
            Alert.alert('Atenção', 'Preencha o e-mail e a senha.')
            return
        }

        setCarregando(true)
        try {
            await entrar(email.trim(), senha)
            // Não precisa navegar: o route.js percebe o login e leva para a Home.
        } catch (erro) {
            Alert.alert('Erro no login', traduzirErro(erro.code))
            setCarregando(false)
        }
    }

    return(
        <View style={styles.container}>
            <ScrollView style={{paddingBottom: 140, flex: 1, width :"100%", backgroundColor: '#F1F2F3'}} contentContainerStyle={{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
            <Text style={styles.textoBemVindo}> Olá, seja bem vindo!</Text>
            <Text style={styles.subTextoBemVindo}> Faça o seu login.</Text>
            {/* ELEMENTOS DE ESTILIZAÇÃO */}
            <View style={styles.circuloTelaLogin1}/>
            <View style={styles.circuloTelaLogin2}/>
            <Image source={logo} style={styles.logo} resizeMode='contain'/>
            {/* FIM DOS ELEMENTOS DE ESTILIZAÇÃO, E SIM, ESSE COMENTÁRIO É MEUUUUUUUUUUUUUUUUUUUUUUUU */}
            <TextInput
                placeholder='Digite o seu E-mail'
                style={styles.caixasDeTexto}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
            />
            <TextInput
                placeholder='Digite a sua Senha'
                style={styles.caixasDeTexto}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                autoCapitalize='none'
            />
            <TouchableOpacity
                style={[styles.btnLogar, carregando && {opacity: 0.6}]}
                onPress={handleLogin}
                disabled={carregando}
            >
                {carregando
                    ? <ActivityIndicator color='#ffffffdf'/>
                    : <Text style={{fontWeight: 'bold', color: '#ffffffdf', fontSize: 15}}> Login </Text>
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Cadastro')}>
                <Text style={{color: '#56a765cc'}}> Não tem cadastro? Faça agora! </Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
    )
}

 const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F2F3',
        // Esta tela tem 2 campos a menos que o Cadastro (2 x 70px).
        // Esse espaço mantém logo, título e círculos na mesma posição do Cadastro.
        
    },
    textoBemVindo:{
        color: "#56A765",
        fontWeight: 'bold',
        fontSize: 34,
        top: 140
    },
    subTextoBemVindo:{
        color: "#56A765",
        fontWeight: 'bold',
        fontSize: 20,
        top: 150,
    },
    circuloTelaLogin1:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#56A765",
        bottom:"-90%",
        left: '40%',
    },
    circuloTelaLogin2:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#56a765cc",
        bottom:"-70%",
        right: '40%',
    },
    caixasDeTexto:{
        backgroundColor: "#cecece85",
        borderRadius: 5,
        width: 320,
        height: 50,
        bottom: 200,
        margin: 10,
        padding: 15
    },
    btnLogar:{
        backgroundColor: "#56a765",
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10
    },
    logo:{
        width: 200,
        height: 100,
        marginTop:-250,
        paddingBottom:200
    }
 })