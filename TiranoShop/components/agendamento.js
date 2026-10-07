import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'

export default function Agendamento(){
    const servico = '🦖| Tosa de escamas';
    const horario = '10h'
    return(
        <View style={styles.container}>
           <Text>
                {servico}, {horario}
           </Text>
        </View>
    )
}

 const styles = StyleSheet.create({
    container:{
        height: 80,
        width: '90%',
        bottom: '50%',
        borderRadius: 15,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#c9cdca56'
    }
 })