import { TextInput, StyleSheet, View } from 'react-native'
import colors from '../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginInput = (props) => {

    return(
        <View style={styles.container}>
            <Icon style={styles.icon} name={props.icon} size={25}/>
            <TextInput style={styles.input} placeholder={props.placeholder} secureTextEntry={props.secure} onChangeText={(newValue) => props.onChangeText(newValue)}/>
        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        display : 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderColor: colors.black,
        borderBottomWidth: 1,
        marginBottom : 30,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    input :{
        fontSize: 25,
        width:'100%'
    },
    icon:{
        marginRight: 10
    }
})

export default LoginInput;