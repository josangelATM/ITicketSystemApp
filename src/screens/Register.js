import  React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {useForm, Controller} from 'react-hook-form'
import colors from '../theme/colors';
import AppButton from '../components/AppButton';
import * as Progress from 'react-native-progress';

const Register = ({navigation}) => {
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(true)
    const [error, setError] = useState('')

    const {
        control, 
        handleSubmit, 
        getValues,
        formState: {errors, isValid}
      } = useForm({mode: 'onBlur'})
      
      

      const register = (data) =>{
        setLoader(true)
        fetch('https://iticketsystem20211228085301.azurewebsites.net/api/authenticate/register',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((json)=>{
                if(json.status == "Error"){
                    setError(json.message)
                    setSuccess(false)
                }else{
                    alert(json.message)
                    navigation.navigate('Login')
                }
                setLoader(false)
            })
        }).catch((error) =>{
            setLoader(false)
            setSuccess(false)
            setError("An error has occurred!")
            console.log(error)
        })
      }

   
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Register</Text> 
            { loader ? <View style={styles.circleContainer}><Progress.Bar size={150} indeterminate={true} borderWidth={5} color={'black'}/></View> : 
            <View  style={styles.formContainer}>
                <Controller        
                control={control}        
                name="EmployeeNumber"        
                render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput 
                        style={styles.input}                     
                        placeholder="Employee Number"            
                        value={value}            
                        onBlur={onBlur}            
                        onChangeText={value => onChange(value)}          
                    />   
                    )} 
                rules={{
                    required:{
                        value: true,
                        message : 'Employee Number is required!'
                    },
                    pattern: {
                        value: /^\d+$/,
                        message : 'Only numbers!'
                    }

                }}
                />
                {errors.EmployeeNumber && <Text style={styles.errorText}>{errors.EmployeeNumber.message}</Text>}
                <Controller        
                control={control}        
                name="FirstName"        
                render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput 
                    style={styles.input}                        
                    placeholder="First Name"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}          
                    />   
                    )} 
                rules={{
                    required:{
                        value: true,
                        message : 'First Name is required!'
                    },
                }}
                />
                {errors.FirstName && <Text style={styles.errorText}>{errors.FirstName.message}</Text>}
                <Controller        
                control={control}        
                name="LastName"        
                render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput
                    style={styles.input}                       
                    placeholder="Last Name"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}          
                    />   
                    )}
                rules={{
                    required:{
                        value: true,
                        message : 'Last Name is required!'
                    }
                }} 
                />
                {errors.LastName && <Text style={styles.errorText}>{errors.LastName.message}</Text>}
                <Controller        
                control={control}        
                name="Position"        
                render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput
                    style={styles.input}                       
                    placeholder="Position"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}          
                    />   
                    )}
                rules={{
                    required:{
                        value: true,
                        message : 'Position is required!'
                    }
                }}  
                />
                {errors.Position && <Text style={styles.errorText}>{errors.Position.message}</Text>}
                <Controller        
                control={control}        
                name="PhoneNumber"        
                render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput
                    style={styles.input}                      
                    placeholder="Phone Number"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}          
                    />   
                    )} 
                rules={{
                    required:{
                        value: true,
                        message : 'Phone Number is required!'
                    },
                    pattern: {
                        value: /^\d+$/,
                        message : 'Only numbers!'
                    }
                    
                }} 
                />
                {errors.PhoneNumber && <Text style={styles.errorText}>{errors.PhoneNumber.message}</Text>}
                <Controller        
                control={control}        
                name="Email"        
                render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput
                    style={styles.input}                      
                    placeholder="Email"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}          
                    />   
                    )} 
                rules={{
                    required:{
                        value: true,
                        message : 'Email is required!'
                    },
                    pattern:{
                        value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                        message : 'Not a valid email'
                    }
                }} 
                />
                {errors.Email && <Text style={styles.errorText}>{errors.Email.message}</Text>}
                <Controller        
                control={control}        
                name="Password"        
                render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput
                    style={styles.input}       
                    secureTextEntry={true}               
                    placeholder="Password"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}          
                    />   
                    )}
                rules={{
                    required:{
                        value: true,
                        message : 'Password is required!'
                    }
                }}  
                />
                {errors.Password && <Text style={styles.errorText}>{errors.Password.message}</Text>}
                <Controller        
                control={control}        
                name="ConfirmPassword"        
                render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput 
                    style={styles.input}    
                    secureTextEntry={true}                          
                    placeholder="Confirm Password"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}          
                    />   
                    )} 
                rules={{
                    required:{
                        value: true,
                        message : 'Confirm Password is required!'
                    },
                    validate: value => value === getValues('Password') || 'Passwords do not match!'
                }} 
                />
                {errors.ConfirmPassword && <Text style={styles.errorText}>{errors.ConfirmPassword.message}</Text>}
                { success ? null : <Text style={styles.errorText}>{error}</Text>}
                <AppButton title='SUBMIT' onPress={handleSubmit(register)} style={styles.button} />
            </View > }
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%'
    },
    formContainer:{
        display : 'flex',
        justifyContent:'space-around',
        alignItems:'center',
        width:'100%'
    },
    circleContainer:{
        display : 'flex',
        alignItems:'center',
        justifyContent: 'center',
        width:'100%'
    },
    title:{
        fontSize: 50,
        marginBottom: 10,
        marginTop: 20,
        width:'100%',
        textAlign:'center'
    },
    input:{
        width:'80%',
        fontSize: 20,
        borderColor: colors.black,
        borderBottomWidth: 1,
        paddingVertical: 5,
        marginBottom : 10
    },
    button:{
        marginTop:15,
        marginBottom: 15
    },
    errorText:{
        color: 'red',
        fontSize : 15,
        marginTop: 0,
        width: '80%',
        textAlign:'left'
    }
})

export default Register;
