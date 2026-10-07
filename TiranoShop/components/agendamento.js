import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

// Card de um agendamento. Os dados vêm por props (antes eram fixos no código).
// "icone" é o nome do ícone do serviço no FontAwesome (ver src/servicos.js).
export default function CardAgendamento({icone, servico, pet, data, horario, onCancelar}){
    return(
        <View style={styles.container}>
            <View style={styles.circuloIcone}>
                <FontAwesome name={icone} size={22} color='#ffffff'/>
            </View>
            <View style={styles.textos}>
                <Text style={styles.servico}>{servico}</Text>
                <View style={styles.linha}>
                    <FontAwesome name='paw' size={13} color='#56a765cc'/>
                    <Text style={styles.detalhe}>{pet}</Text>
                </View>
                <View style={styles.linha}>
                    <FontAwesome name='calendar' size={13} color='#56a765cc'/>
                    <Text style={styles.detalhe}>{data} às {horario}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.btnCancelar} onPress={onCancelar}>
                <FontAwesome name='times' size={20} color='#56a765cc'/>
            </TouchableOpacity>
        </View>
    )
}

 const styles = StyleSheet.create({
    container:{
        width: '100%',
        minHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#c9cdca56'
    },
    circuloIcone:{
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56a765'
    },
    textos:{
        flex: 1
    },
    servico:{
        color: '#56A765',
        fontWeight: 'bold',
        fontSize: 17
    },
    linha:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2
    },
    detalhe:{
        color: '#444',
        fontSize: 14,
        marginLeft: 6
    },
    btnCancelar:{
        padding: 8
    }
 })