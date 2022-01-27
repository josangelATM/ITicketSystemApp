import { DataTable } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DataTableView = ({data}) => {
    const navigation = useNavigation(); 
        return(
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.idRow}>ID</DataTable.Title>
                    <DataTable.Title style={styles.normalRow}>TYPE</DataTable.Title>
                    <DataTable.Title style={styles.normalRow}>REQUESTER</DataTable.Title>
                    <DataTable.Title style={styles.normalRow}>STATUS</DataTable.Title>
                </DataTable.Header>
                {data.map((item) =>(
                    <DataTable.Row key={item.ticket.id} onPress={() =>navigation.navigate('Ticket',{ 
                        item
                    })}>
                        <DataTable.Cell style={styles.idRow}>{item.ticket.id}</DataTable.Cell>
                        <DataTable.Cell style={styles.normalRow}>{item.ticketTypeTitle}</DataTable.Cell>
                        <DataTable.Cell style={styles.normalRow}>{item.requester.userName}</DataTable.Cell>
                        <DataTable.Cell style={styles.normalRow}>{item.ticket.status}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        )
    }

const styles = StyleSheet.create({
    dataTable:{
        borderColor: 'black',
        borderWidth:4
    },
    dataHeader:{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center'
    },
    dataText:{
        fontSize:14,
        textAlign:'center',
        marginVertical:5
    },
    idRow:{
        flex:0.5,
        justifyContent:'center'
    },
    normalRow:{
        flex:1,
        justifyContent:'center'
    }
})
export default DataTableView;