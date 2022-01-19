import { Button, StyleSheet,TouchableOpacity, Text } from 'react-native';
import colors from '../theme/colors';

const AppButton = ({onPress, title, disabled,style}) =>(
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer,style, disabled ? styles.buttonDisable : null]} disabled={disabled}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
    )

const styles = StyleSheet.create({
    appButtonContainer:{
        display: 'flex',
        justifyContent :'center',
        alignItems: 'center',
        backgroundColor: colors.black,
        width: '40%',
        height: 50
    },
    appButtonText:{
        color: colors.white,
        fontSize: 15
    },
    buttonDisable:{
        backgroundColor:'gray'
    }
})


export default AppButton;