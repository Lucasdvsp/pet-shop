import {useState} from 'react'
import {ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image} from 'react-native'
import {cadastrar, traduzirErro} from '../src/services/authService'

export default function Cadastro({navigation}){
    const logo = require('../assets/logotipo para pet shop azul e rosa.png');
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [carregando, setCarregando] = useState(false)

    async function handleCadastro(){
        if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
            Alert.alert('Atenção', 'Preencha todos os campos.')
            return
        }
        if (senha.length < 6) {
            Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.')
            return
        }
        if (senha !== confirmarSenha) {
            Alert.alert('Atenção', 'As senhas não conferem.')
            return
        }

        setCarregando(true)
        try {
            await cadastrar(nome.trim(), email.trim(), senha)
            // Não precisa navegar: o route.js percebe o login e leva para a Home.
        } catch (erro) {
            Alert.alert('Erro no cadastro', traduzirErro(erro.code))
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
            <Text style={styles.subTextoBemVindo}> Faça o seu cadastro.</Text>
            {/* ELEMENTOS DE ESTILIZAÇÃO */}
            <View style={styles.circuloTelaLogin1}/>
            <View style={styles.circuloTelaLogin2}/>
            <Image source={logo} style={styles.logo} resizeMode='contain'/>
            {/* FIM DOS ELEMENTOS DE ESTILIZAÇÃO, E SIM, ESSE COMENTÁRIO É MEUUUUUUUUUUUUUUUUUUUUUUUU */}
            <TextInput
                placeholder='Digite o seu Nome'
                style={styles.caixasDeTexto}
                value={nome}
                onChangeText={setNome}
                autoCapitalize='words'
            />
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
            <TextInput
                placeholder='Confirme a sua Senha'
                style={styles.caixasDeTexto}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
                autoCapitalize='none'
            />
            <TouchableOpacity
                style={[styles.btnCadastrar, carregando && {opacity: 0.6}]}
                onPress={handleCadastro}
                disabled={carregando}
            >
                {carregando
                    ? <ActivityIndicator color='#ffffffdf'/>
                    : <Text style={{fontWeight: 'bold', color: '#ffffffdf', fontSize: 15}}> Cadastrar-se </Text>
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.jaTemCadastro} onPress={()=> navigation.navigate('Login')}>
                <Text style={{color: '#56a765cc'}}> Já tem cadastro? Faça seu Login! </Text>
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
        backgroundColor: '#F1F2F3'
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
    btnCadastrar:{
        backgroundColor: "#56a765",
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin:10
    },
    logo:{
        width: 200,
        height: 100,
        marginTop:-250,
        paddingBottom:200
    }
 })