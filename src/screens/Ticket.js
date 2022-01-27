import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';
import * as SecureStore from 'expo-secure-store';
import colors from "../theme/colors";
import AppButton from "../components/AppButton";
import { useNavigation } from '@react-navigation/native';

const Ticket = ({route}) => {
    const navigation = useNavigation(); 
    const {item} = route.params
    const [response,setResponse] = useState(item.ticket.response)
    const [status,setStatus] = useState(item.ticket.status)
    const [token,setToken] = useState('')
    const STATUS = ['ASSIGNED','COMPLETED','FAILED','WORKING']

    useEffect(() =>{
        SecureStore.getItemAsync('token')
        .then((token)=>{
            setToken(token)
        })
        .catch((error)=>{
            alert('An error has ocurred!')
        })
    })

    const patchTicket = () =>{
        const data = 
        [
            {
                "value":status,
                "path":"/Status",
                "op":"replace"
            },
            {
                "value":response,
                "path":"/Response",
                "op":"replace"
            },
        ]
        fetch('https://iticketsystem20211228085301.azurewebsites.net/api/tickets/'+item.ticket.id,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then((response)=> response.json())
        .then((json)=>{
            alert(json.message)
            navigation.navigate('Home')
        })

    }


    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Ticket # {item.ticket.id}</Text>
            <Text style={styles.subTitle}>{item.ticketTypeTitle}</Text>
            <View>
                <Text style={styles.label}>Comments</Text>
                <TextInput style={styles.textBox} value={item.ticket.comments} editable={false} selectTextOnFocus={false}/>
            </View>
            <View>
                <Text style={styles.label}>Response</Text>
                <TextInput style={styles.textBox} value={response} onChangeText={(newValue) => setResponse(newValue)}/>
            </View>
            <View>
                <Text style={styles.label}>Status</Text>
                <Picker
                style={styles.picker}
                selectedValue={status}
                onValueChange={(newValue) => setStatus(newValue)}
                >
                {STATUS.map((stat,index)=>(
                    <Picker.Item label={stat} value={stat} key={index}/>
                ))}    
                </Picker>
            </View>
            <Text style={styles.label}>Requester: <Text style={{fontWeight:'bold'}}>{item.requester.userName}</Text></Text>
            <Text style={styles.label}>Assigned To: <Text style={{fontWeight:'bold'}}>{item.assignedTo.userName}</Text></Text>
            <View style={styles.buttonContainer}>
                <AppButton title='UPDATE' onPress={patchTicket}/>
            </View>
            
        </ScrollView>
    )
}

export default Ticket;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        textAlign:'center'
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center'
    },
    picker:{
        borderColor: colors.black,
        borderWidth:2,
        borderRadius:5
    },
    subTitle:{
        fontSize:35,
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center'
    },
    textBox:{
        borderColor: colors.black,
        fontSize:17,
        borderWidth:2,
        borderRadius:5,
        height:100,
        padding:10,
        width:'100%',
        textAlignVertical:'top'
    },
    label:{
        fontSize:17
    },
    buttonContainer:{
        flex: 1,
        alignItems:'center',
        marginTop:20
    }
})