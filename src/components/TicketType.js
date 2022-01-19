import { Button, StyleSheet,View, Text } from 'react-native';
import AppButton from './AppButton';

const TicketType = (props) =>{
    console.log(props)
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.item.title}</Text>
            <Text>{props.item.description}</Text>
            <AppButton title='Create' style={styles.button}/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'space-around',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius:5,
        height:'50%',
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    button:{
        borderRadius:5,
        height:30,
        marginTop:5
    },
    title:{
        fontSize:20,
        fontWeight: 'bold',
        marginBottom:5
    }
})

export default TicketType;