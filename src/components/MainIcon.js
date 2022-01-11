import { Button, StyleSheet,TouchableOpacity, Text } from 'react-native';
import colors from '../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MainIcon = (props) => {

    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Icon name={props.icon} size={80}/>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf:'center',
        width:'auto'
    },
    text :{
        fontSize: 30,
    },
    icon:{
        marginRight: 10
    }
})


export default MainIcon;