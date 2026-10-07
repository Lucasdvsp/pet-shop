import {StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

// Botão de voltar (ícone de seta) para as telas que ficam fora da Home.
export default function BotaoVoltar(){
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    return(
        <TouchableOpacity
            style={[styles.botao, {top: insets.top + 16}]}
            onPress={()=> navigation.goBack()}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
        >
            <FontAwesome name='arrow-left' size={18} color='#ffffff'/>
        </TouchableOpacity>
    )
}

 const styles = StyleSheet.create({
    botao:{
        position: 'absolute',
        left: 20,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56a765cc'
    }
 })