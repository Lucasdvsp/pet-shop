import {Text, View, StyleSheet} from 'react-native'

export default function Cadastro({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.textoBemVindo}> Olá, seja bem vindo!</Text>
            <Text style={styles.subTextoBemVindo}> Faça o seu cadastro.</Text>
            <View style={styles.circuloTelaLogin1}/>
            <View style={styles.circuloTelaLogin2}/>
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
        bottom: 150
    },
    subTextoBemVindo:{
        color: "#56A765",
        fontWeight: 'bold',
        fontSize: 20,
        bottom: 150
    },
    circuloTelaLogin1:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#56A765",
        top: 450,
        left: 150
    },
    circuloTelaLogin2:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#56a765",
        opacity: 40,
        top: 300,
        right: 150
    }
 })