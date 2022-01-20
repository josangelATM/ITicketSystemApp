import { useState } from 'react';
import {StyleSheet,View, Text, TextInput, ScrollView } from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../theme/colors';
import * as SecureStore from 'expo-secure-store';
const CreateTicket = ({route,navigation}) =>{
    const {ticketType} = route.params
    const [comments,setComments] = useState('')

    const postTicket = () =>{
        SecureStore.getItemAsync('token').then((token)=>{
            var jsonData = JSON.stringify({
                TicketTypeId: ticketType.id,
                Comments: comments
            })
            
            fetch('https://iticketsystem20211228085301.azurewebsites.net/api/tickets',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: jsonData
            })
            .then((response)=> response.json())
            .then((json)=>{
                alert(json.message)
                navigation.navigate('Home')
            }).catch((error)=>{
                alert('An error has ocurred!')
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{ticketType.title}</Text>
                <Text style={styles.description}>{ticketType.description}</Text>
                <TextInput style={styles.comments} onChangeText={(text) => setComments(text) }/>
                <AppButton style={styles.button} title='SEND TICKET' onPress={postTicket}/>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:8,
        alignItems:'center',
        width:'100%'
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center'
    },
    description:{
        fontSize:20
    },
    comments:{
        borderColor: colors.black,
        fontSize:20,
        borderWidth:2,
        borderRadius:5,
        height:200,
        padding:10,
        marginVertical:30,
        width:'100%',
        textAlignVertical:'top'
    },
})

export default CreateTicket;