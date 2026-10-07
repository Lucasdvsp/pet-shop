import {useEffect} from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import BotaoVoltar from '../components/botaoVoltar'
import {useAgendamentos} from '../src/context/AgendamentosContext'

const dois = (n)=> String(n).padStart(2, '0')
function formatar(ms){
    const d = new Date(ms)
    return `${dois(d.getDate())}/${dois(d.getMonth() + 1)} às ${dois(d.getHours())}:${dois(d.getMinutes())}`
}

export default function Notificacoes(){
    const insets = useSafeAreaInsets()
    const {notificacoes, marcarTodasComoLidas} = useAgendamentos()

    // Ao abrir a tela, tudo que já chegou é marcado como lido.
    useEffect(()=> {
        const t = setTimeout(marcarTodasComoLidas, 800)
        return ()=> clearTimeout(t)
    }, [notificacoes.length])

    return(
        <View style={styles.container}>
            <BotaoVoltar/>
            <Text style={[styles.titulo, {marginTop: insets.top + 80}]}> Notificações </Text>

            <FlatList
                data={notificacoes}
                keyExtractor={(item)=> item.id}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={
                    <Text style={styles.vazio}> Nenhuma notificação por aqui ainda. </Text>
                }
                renderItem={({item})=>(
                    <View style={[styles.card, !item.lida && styles.cardNaoLido]}>
                        <View style={styles.circuloIcone}>
                            <FontAwesome
                                name={item.tipo === 'confirmacao' ? 'check' : 'bell'}
                                size={18}
                                color='#ffffff'
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.cardTitulo}>{item.titulo}</Text>
                            <Text style={styles.cardMensagem}>{item.mensagem}</Text>
                            <Text style={styles.cardHora}>{formatar(item.exibirEm)}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

 const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F1F2F3'
    },
    titulo:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 34,
        marginBottom: 12,
        textAlign: 'center'
    },
    lista:{
        paddingHorizontal: 24,
        paddingBottom: 40
    },
    vazio:{
        color: '#56a765cc',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20
    },
    card:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#c9cdca56'
    },
    cardNaoLido:{
        borderLeftWidth: 4,
        borderLeftColor: '#56A765'
    },
    circuloIcone:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56a765'
    },
    cardTitulo:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 16
    },
    cardMensagem:{
        color: '#444',
        fontSize: 14,
        marginTop: 2
    },
    cardHora:{
        color: '#56a765cc',
        fontSize: 12,
        marginTop: 4
    }
 })