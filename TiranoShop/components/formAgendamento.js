import {useState} from 'react'
import {
    Text, View, StyleSheet, TextInput, TouchableOpacity,
    Modal, Alert, KeyboardAvoidingView, Platform
} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {SERVICOS} from '../src/services/servicos'

// Coloca as barras/dois pontos enquanto a pessoa digita
function mascaraData(texto){
    const n = texto.replace(/\D/g, '').slice(0, 8)
    if (n.length > 4) return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`
    if (n.length > 2) return `${n.slice(0, 2)}/${n.slice(2)}`
    return n
}

function mascaraHorario(texto){
    const n = texto.replace(/\D/g, '').slice(0, 4)
    if (n.length > 2) return `${n.slice(0, 2)}:${n.slice(2)}`
    return n
}

// Devolve o Date, ou null se a data/hora não existir (ex.: 31/02/2026 ou 25:00)
function montarDataHora(data, horario){
    const d = data.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    const h = horario.match(/^(\d{2}):(\d{2})$/)
    if (!d || !h) return null

    const dia = Number(d[1]), mes = Number(d[2]), ano = Number(d[3])
    const hora = Number(h[1]), minuto = Number(h[2])
    const quando = new Date(ano, mes - 1, dia, hora, minuto)

    const valida =
        quando.getFullYear() === ano &&
        quando.getMonth() === mes - 1 &&
        quando.getDate() === dia &&
        hora <= 23 && minuto <= 59
    return valida ? quando : null
}

// servico: 'banho' | 'tosa' | 'consulta' (ou null com o formulário fechado)
export default function FormAgendamento({servico, onFechar, onSalvar}){
    const [pet, setPet] = useState('')
    const [data, setData] = useState('')
    const [horario, setHorario] = useState('')

    const config = SERVICOS[servico]

    function limpar(){
        setPet('')
        setData('')
        setHorario('')
    }

    function fechar(){
        limpar()
        onFechar()
    }

    function confirmar(){
        if (!pet.trim() || !data || !horario) {
            Alert.alert('Atenção', 'Preencha todos os campos.')
            return
        }
        const quando = montarDataHora(data, horario)
        if (!quando) {
            Alert.alert('Atenção', 'Informe uma data (DD/MM/AAAA) e um horário (HH:MM) válidos.')
            return
        }
        if (quando <= new Date()) {
            Alert.alert('Atenção', 'Escolha uma data e um horário que ainda não passaram.')
            return
        }

        onSalvar({servico, pet: pet.trim(), data, horario, quando: quando.getTime()})
        limpar()
    }

    return(
        <Modal
            visible={!!servico}
            transparent
            animationType='fade'
            statusBarTranslucent
            onRequestClose={fechar}
        >
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Fundo escuro: tocar fora do formulário fecha */}
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={fechar}>
                    {/* activeOpacity 1 + onPress vazio: tocar dentro do formulário não fecha */}
                    <TouchableOpacity style={styles.form} activeOpacity={1}>
                        <View style={styles.titulo}>
                            {config && <FontAwesome name={config.icone} size={20} color='#56A765'/>}
                            <Text style={styles.textoTitulo}>{config?.chamada}</Text>
                        </View>

                        <View style={styles.item}>
                            <Text>Nome do pet</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Ex.: Rex'
                                placeholderTextColor='#B3B3B3'
                                value={pet}
                                onChangeText={setPet}
                                autoCapitalize='words'
                            />
                        </View>

                        <View style={styles.item}>
                            <Text>Data</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='DD/MM/AAAA'
                                placeholderTextColor='#B3B3B3'
                                value={data}
                                onChangeText={(t)=> setData(mascaraData(t))}
                                keyboardType='number-pad'
                            />
                        </View>

                        <View style={styles.item}>
                            <Text>Horário</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='HH:MM'
                                placeholderTextColor='#B3B3B3'
                                value={horario}
                                onChangeText={(t)=> setHorario(mascaraHorario(t))}
                                keyboardType='number-pad'
                            />
                        </View>

                        <View style={styles.item}>
                            <TouchableOpacity style={styles.button} onPress={confirmar}>
                                <Text style={{color: '#F5F5F5'}}>Agendar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Modal>
    )
}

 const styles = StyleSheet.create({
    overlay:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%'
    },
    form:{
        width: '80%',
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        gap: 8
    },
    titulo:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    textoTitulo:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 18
    },
    item:{
        gap: 8
    },
    input:{
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 8,
        padding: 8
    },
    button:{
        backgroundColor: '#56a765',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center'
    }
 })