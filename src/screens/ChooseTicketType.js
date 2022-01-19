import  React, { useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import * as Progress from 'react-native-progress';
import * as SecureStore from 'expo-secure-store';
import TicketType from '../components/TicketType';

const ChooseTicketType = () => {
    const [isBusy, setBusy] = useState(true)
    const [ticketTypes,setTicketTypes] = useState([])
    const [error,setError] = useState('')


    const fetchTicketTypes = () =>{


        SecureStore.getItemAsync('token').then((token) =>{
            var getHeaders = new Headers();
            getHeaders.append("Authorization", "Bearer " + token);
            var requestOptions = {
                method: "GET",
                headers: getHeaders,
            };
            fetch('https://iticketsystem20211228085301.azurewebsites.net/api/tickettypes',requestOptions)
            .then((response) => response.json())
            .then((json) =>{
                setTicketTypes(json.data)
                setBusy(false)
            })
            .catch((error) =>{
            console.log(JSON.stringify(error))
            })
        })
    }

    useEffect(()=>{
        fetchTicketTypes()
    },[])

    
    return(
        <View style={styles.container}>
            { isBusy ? <Progress.Bar size={100} indeterminate={true} borderWidth={5} color={'black'}/> 
            :
            <FlatGrid
                data={ticketTypes}
                style={styles.grid}
                spacing={20}
                renderItem={(ticketType) => (
                    <TicketType {...ticketType}/>
                )}
            />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    grid:{
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ChooseTicketType;