import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'

export default function Cadastro({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.textoBemVindo}> Olá, seja bem vindo!</Text>
            <Text style={styles.subTextoBemVindo}> Faça o seu cadastro.</Text>
            {/* ELEMENTOS DE ESTILIZAÇÃO */}
            <View style={styles.circuloTelaLogin1}/>
            <View style={styles.circuloTelaLogin2}/>
            {/* FIM DOS ELEMENTOS DE ESTILIZAÇÃO, E SIM, ESSE COMENTÁRIO É MEUUUUUUUUUUUUUUUUUUUUUUUU */}
            <TextInput
                placeholder='Digite o seu Nome'
                style={styles.caixasDeTexto}
            />
            <TextInput
                placeholder='Digite o seu E-mail'

                style={styles.caixasDeTexto}
            />
            <TextInput
                placeholder='Digite a sua Senha'
                style={styles.caixasDeTexto}
            />
            <TextInput
                placeholder='Confirme a sua Senha'
                style={styles.caixasDeTexto}
            />
            {/* TEMPORARIAMENTE O BOTÃO JÁ VAI PRA HOME MESMO SEM VALIDAÇÃO, UMA VEZ QUE AINDA NÃO FORA FEITA A AUTENTICAÇÃO */}
            <TouchableOpacity style={styles.btnCadastrar} onPress={()=> navigation.navigate('Home')}>
                <Text style={{fontWeight: 'bold', color: '#ffffffdf', fontSize: 15}}> Cadastrar-se </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.jaTemCadastro} onPress={()=> navigation.navigate('Login')}>
                <Text style={{color: '#56a765cc'}}> Já tem cadastro? Faça seu Login! </Text>
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
        top: 150
    },
    circuloTelaLogin1:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#56A765",
        top: '75%',
        left: '40%'
    },
    circuloTelaLogin2:{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#56a765cc",
        top: '55%',
        right: '40%'
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
        bottom: 160,
        backgroundColor: "#56a765",
        width: 260,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    jaTemCadastro: {
        bottom: 150
    }
 })