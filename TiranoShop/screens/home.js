import {useEffect, useState} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert, Image} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {auth} from '../src/firebase'
import {observarPerfil} from '../src/services/authService'
import {SERVICOS, PRODUTOS} from '../src/services/servicos.js'
import CardAgendamento from '../components/agendamento'
import FormAgendamento from '../components/formAgendamento'

export default function Home({navigation}){
    const logo = require('../assets/logotipo para pet shop azul e rosa.png');
    const insets = useSafeAreaInsets()
    const [nome, setNome] = useState(auth.currentUser?.displayName)
    const [agendamentos, setAgendamentos] = useState([])
    const [servicoAberto, setServicoAberto] = useState(null) // qual formulário está aberto

    // Logo após o cadastro o nome ainda está sendo salvo; isso atualiza a saudação quando chega.
    useEffect(()=> observarPerfil((usuario)=> setNome(usuario.displayName)), [])

    const primeiroNome = nome ? nome.trim().split(' ')[0] : null

    function salvarAgendamento(novo){
        setAgendamentos((lista)=>
            [...lista, {...novo, id: Date.now().toString()}].sort((a, b)=> a.quando - b.quando)
        )
        setServicoAberto(null)
    }

    function cancelarAgendamento(agendamento){
        const config = SERVICOS[agendamento.servico]
        Alert.alert(
            'Cancelar agendamento',
            `Deseja cancelar ${config.nome.toLowerCase()} de ${agendamento.pet}?`,
            [
                {text: 'Não', style: 'cancel'},
                {
                    text: 'Sim, cancelar',
                    style: 'destructive',
                    onPress: ()=> setAgendamentos((lista)=> lista.filter((a)=> a.id !== agendamento.id))
                }
            ]
        )
    }

    return(
        <View style={styles.container}>
            {/* ELEMENTOS DE ESTILIZAÇÃO */}
            <View style={styles.circuloTelaLogin1} pointerEvents='none'/>
            <View style={styles.circuloTelaLogin2} pointerEvents='none'/>

            <ScrollView
                contentContainerStyle={[styles.conteudo, {paddingTop: insets.top + 24}]}
                showsVerticalScrollIndicator={false}
            >
                {/* TOPO: logo e atalhos para Notificações e Perfil */}
                <View style={styles.topo}>
                    <Image source={logo} style={styles.logo} resizeMode='contain'/>
                    <View style={styles.atalhos}>
                        <TouchableOpacity style={styles.btnAtalho} onPress={()=> navigation.navigate('Notificacoes')}>
                            <FontAwesome name='bell' size={20} color='#56A765'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAtalho} onPress={()=> navigation.navigate('Perfil')}>
                            <FontAwesome name='user' size={20} color='#56A765'/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.textoBemVindo}>
                    {primeiroNome ? `Olá, ${primeiroNome}!` : 'Olá!'}
                </Text>
                <Text style={styles.subTexto}>O que o seu tiranossauro precisa hoje?</Text>

                {/* AS 4 OPÇÕES DA HOME */}
                <View style={styles.opcoes}>
                    {Object.entries(SERVICOS).map(([chave, servico])=>(
                        <TouchableOpacity
                            key={chave}
                            style={styles.opcao}
                            onPress={()=> setServicoAberto(chave)}
                        >
                            <FontAwesome name={servico.icone} size={36} color='#56A765' style={styles.opcaoIcone}/>
                            <Text style={styles.opcaoTexto}>{servico.chamada}</Text>
                        </TouchableOpacity>
                    ))}
                    {/* A tela de produtos será feita depois */}
                    <TouchableOpacity
                        style={styles.opcao}
                        onPress={()=> Alert.alert('Em breve', 'A loja do Tirano Shop está chegando!')}
                    >
                        <FontAwesome name={PRODUTOS.icone} size={36} color='#56A765' style={styles.opcaoIcone}/>
                        <Text style={styles.opcaoTexto}>{PRODUTOS.chamada}</Text>
                    </TouchableOpacity>
                </View>

                {/* AGENDAMENTOS FEITOS */}
                <Text style={styles.tituloSecao}>Meus agendamentos</Text>
                {agendamentos.length === 0 ? (
                    <Text style={styles.vazio}>
                        Nenhum agendamento por aqui ainda. Escolha um serviço acima! 🦖
                    </Text>
                ) : (
                    agendamentos.map((agendamento)=>{
                        const servico = SERVICOS[agendamento.servico]
                        return(
                            <CardAgendamento
                                key={agendamento.id}
                                icone={servico.icone}
                                servico={servico.nome}
                                pet={agendamento.pet}
                                data={agendamento.data}
                                horario={agendamento.horario}
                                onCancelar={()=> cancelarAgendamento(agendamento)}
                            />
                        )
                    })
                )}
            </ScrollView>

            <FormAgendamento
                servico={servicoAberto}
                onFechar={()=> setServicoAberto(null)}
                onSalvar={salvarAgendamento}
            />
        </View>
    )
}

 const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F1F2F3'
    },
    conteudo:{
        paddingHorizontal: 24,
        paddingBottom: 40
    },
    topo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    logo:{
        width: 150,
        height: 60
    },
    atalhos:{
        flexDirection: 'row'
    },
    btnAtalho:{
        width: 44,
        height: 44,
        borderRadius: 22,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c9cdca56'
    },
    textoBemVindo:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 34
    },
    subTexto:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 24
    },
    opcoes:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    opcao:{
        width: '48%',
        minHeight: 120,
        marginBottom: 12,
        padding: 12,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c9cdca56'
    },
    opcaoIcone:{
        marginBottom: 8
    },
    opcaoTexto:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    tituloSecao:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 12
    },
    vazio:{
        color: '#56a765cc',
        fontSize: 14
    },
    circuloTelaLogin1:{
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#56A765',
        bottom: -70,
        right: -70
    },
    circuloTelaLogin2:{
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#56a765cc',
        bottom: 80,
        left: -110
    }
 })