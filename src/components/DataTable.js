import { Table, Row, Rows } from 'react-native-table-component';
import { StyleSheet, View, Text } from 'react-native';
const DataTable = ({data}) => {
    const tableHeader = ['ID','TYPE','ASSIGNED','REQUESTER','STATUS'] 
    const cellWidth = [20,100,100,100,100]
    return(
        <Table >
            <Row data={tableHeader} textStyle={styles.dataHeader} widthArr={cellWidth}/>
            {data.map((item)=>{
                var finalData = [item.ticket.id,item.ticketTypeTitle,
                item.assignedTo.userName,item.requester.userName,
                item.ticket.status]
                return(
                    <Row key={item.ticket.id} data={finalData} widthArr={cellWidth} textStyle={styles.dataText}/>
                )
            })}
        </Table>
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
    }
})
export default DataTable;