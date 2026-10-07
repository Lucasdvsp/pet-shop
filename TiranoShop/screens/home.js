import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import Menu from '../components/menu'
import CardAgendamento from '../components/agendamento'

export default function Cadastro({navigation}){
    return(
        <View style={styles.container}>
            <Menu/>
            <TouchableOpacity style={styles.btnAgendar}>
                <Text style={{color: '#ffff'}}> Agendar Serviço </Text>
            </TouchableOpacity>
            <View style={styles.circuloTelaLogin1}/>
            <View style={styles.circuloTelaLogin2}/>

            {/* O QUE VOCÊ PRECISA FAZER: BOTÃO AGENDAR -> FORMS DE AGENDAMENTO -> RENDERIZA O COMPONENTE NA TELA, IGUAL NO TCC/REMÉDIOS */}
            {/* EXEMPLO DE COMO VAI SER O CARD */}
            <CardAgendamento/>


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
    btnAgendar:{
        top: '50%',
        backgroundColor: "#56a765",
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
        circuloTelaLogin1:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#56A765",
        top: '55%',
        left: '40%'
    },
    circuloTelaLogin2:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#56a765cc",
        top: '35%',
        right: '40%'
    }
 })