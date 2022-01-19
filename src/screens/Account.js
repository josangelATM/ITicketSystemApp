import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AppButton from '../components/AppButton'
import { logout } from '../store/actions'
import * as SecureStore from 'expo-secure-store';
import {Restart} from 'fiction-expo-restart';

const Account = ({navigation}) =>{
    const dispatch = useDispatch()
    const userLogout = () =>{
        SecureStore.deleteItemAsync('token').then(()=>{
            dispatch(logout)
            Restart()
        }).catch((error)=>{
            console.log(error)
        })
     }


    return(
        <View style={styles.container}>
            <Text>Features coming soon... for a while use the logout button :D</Text>
            <AppButton title='LOGOUT' onPress={userLogout}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Account;