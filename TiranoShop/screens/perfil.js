import {Text, View, StyleSheet} from 'react-native'

export default function Perfil({navigation}){
    return(
        <View style={styles.container}>
            <Text>
                Oi
            </Text>
        </View>
    )
}

 const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
 })