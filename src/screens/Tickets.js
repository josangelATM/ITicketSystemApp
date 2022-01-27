import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import * as SecureStore from 'expo-secure-store';
import DataTableView from '../components/DataTableView'
const Tickets = ({navigation}) => {
    const [data,setData] = useState([])
    const [isBusy,setBusy] = useState(true)

    navigation
    
    const fetchTickets = () =>{
        SecureStore.getItemAsync('token').then((token) =>{
            var getHeaders = new Headers();
            getHeaders.append("Authorization", "Bearer " + token);
            var requestOptions = {
                method: "GET",
                headers: getHeaders,
            }
            fetch('https://iticketsystem20211228085301.azurewebsites.net/api/tickets',requestOptions)
            .then((response) => response.json())
            .then((json) =>{
                setData(json.data)
                setBusy(false)
            })
            .catch((error) =>{
                alert("An error has ocurred!")
            })
        })
    }

    

    useEffect(() =>{
        fetchTickets()
    },[])

    return(
        <View style={styles.mainContainer}>
             { isBusy ? <View style={styles.container}><Progress.Bar size={100} indeterminate={true} borderWidth={5} color={'black'}/></View>   
            :
            data.length<1 ? <View style={styles.container}><Text>No Tickets to show</Text></View> 
            :
            <View style={styles.tableContainer}>
                <Text style={styles.title}>My Tickets</Text>
                <DataTableView data={data}/>
            </View>   
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    mainContainer:{
        flex:1
    },
    tableContainer:{
        flex:1
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:20
    }
})

export default Tickets;