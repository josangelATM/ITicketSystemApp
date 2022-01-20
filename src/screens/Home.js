import { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'
import MainIcon from '../components/MainIcon';


const Home = ({navigation}) =>{
    const isAdmin = useSelector((state) => state.auth.isAdmin)
    const user = useSelector((state) => state.auth)
    return(
        <View style={styles.container}>
            { isAdmin ? 
            <ScrollView style={styles.buttonContainerScroll}>
                <Text style={styles.welcomeTitle}>Hello {user.user.firstName}!</Text> 
                <MainIcon title='Request something' icon='tools' onPress={() => navigation.navigate('ChooseTicketType')}/>
                <MainIcon title='My Tickets' icon='list' onPress={() => navigation.navigate('Tickets')}/>
                <MainIcon title='Account' icon='user-alt'/>
                <MainIcon title='My Tickets' icon='users'/>
                <MainIcon title='Account' icon='clipboard-list' onPress={() => navigation.navigate('Account')}/>
            </ScrollView>
            :             
            <View style={styles.buttonContainer}>
                <Text style={styles.welcomeTitle}>Hello {user.user.firstName}!</Text> 
                <MainIcon title='Request something' icon='tools'/>
                <MainIcon title='Users' icon='list'/>
                <MainIcon title='Account' icon='user-alt' onPress={() => navigation.navigate('Account')}/>
            </View> 
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        width:'100%'
    },
    welcomeTitle:{
        fontSize:40,
        marginTop:20,
        textAlign:'center',
        marginBottom:20
    },
    buttonContainer:{
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    buttonContainerScroll:{
        width:'100%'
    }
})

export default Home;