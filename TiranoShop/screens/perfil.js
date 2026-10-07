import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {auth} from '../src/firebase'
import {sair} from '../src/services/authService'
import BotaoVoltar from '../components/botaoVoltar'
import {useAgendamentos} from '../src/context/AgendamentosContext'

export default function Perfil(){
    const {limpar} = useAgendamentos()
    const usuario = auth.currentUser

    async function handleLogout(){
        try {
            limpar()
            await sair()
            // Não precisa navegar: o route.js percebe o logout e volta para o Cadastro.
        } catch (erro) {
            Alert.alert('Erro', 'Não foi possível sair. Tente novamente.')
        }
    }

    return(
        <View style={styles.container}>
            <BotaoVoltar/>
            <Text style={styles.titulo}> Meu Perfil </Text>
            <View style={styles.card}>
                <Text style={styles.rotulo}> Nome </Text>
                <Text style={styles.valor}> {usuario?.displayName || 'Não informado'} </Text>
                <Text style={styles.rotulo}> E-mail </Text>
                <Text style={styles.valor}> {usuario?.email} </Text>
            </View>
            <TouchableOpacity style={styles.btnSair} onPress={handleLogout}>
                <Text style={{fontWeight: 'bold', color: '#ffffffdf', fontSize: 15}}> Sair </Text>
            </TouchableOpacity>
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
    titulo:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 34,
        marginBottom: 30
    },
    card:{
        width: '90%',
        borderRadius: 15,
        padding: 20,
        backgroundColor: '#c9cdca56',
        marginBottom: 30
    },
    rotulo:{
        color: '#56a765cc',
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 10
    },
    valor:{
        color: '#333',
        fontSize: 18
    },
    btnSair:{
        backgroundColor: '#56a765',
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
 })