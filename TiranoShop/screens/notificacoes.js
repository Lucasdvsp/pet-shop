import {Text, View, StyleSheet} from 'react-native'
import BotaoVoltar from '../components/botaoVoltar'

// PROVISÓRIO: a lista de notificações ainda será implementada.
export default function Notificacoes(){
    return(
        <View style={styles.container}>
            <BotaoVoltar/>
            <Text style={styles.titulo}> Notificações </Text>
            <Text style={styles.vazio}> Nenhuma notificação por aqui ainda. </Text>
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
        marginBottom: 12
    },
    vazio:{
        color: '#56a765cc',
        fontSize: 14
    }
 })