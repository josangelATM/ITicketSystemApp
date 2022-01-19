import  React, { useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginInput from '../components/LoginInput';
import colors from '../theme/colors';
import AppButton from '../components/AppButton';
import * as Progress from 'react-native-progress';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux'
import { fetchUserData } from '../store/actions/index'

const Login = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(true)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = () =>{
  var jsonData = JSON.stringify({
    Username : username,
    password : password
  })
  setLoader(true);
  fetch('https://iticketsystem20211228085301.azurewebsites.net/api/authenticate/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
  .then((response) => response.json())
  .then((json) =>{
    if(json.status == '401'){
      setError('Invalid login')
      setSuccess(false)
      setLoader(false)
    }else{
      SecureStore.setItemAsync('token',json.token).then(() =>{
        dispatch(fetchUserData(json.token))
        setLoader(false)
      })
    }
  })
  .catch(() =>{
    setError('Error while connecting to the server')
    setSuccess(false)
    setLoader(false)
  })
  }
    return(
        <View style={styles.container}>
          <Text style={styles.title}>ITicketSystem</Text>
          { loader ? <Progress.Bar size={100} indeterminate={true} borderWidth={5} color={'black'}/> : 
          <View style={styles.formContainer}>
            <LoginInput
            secure={false}
            icon='user'
            placeholder='Username'
            onChangeText={setUsername}
            />
            <LoginInput
            secure={true}
            icon='lock'
            placeholder='Password'
            onChangeText={setPassword}
            />
            <Text style={styles.registerLink}>
              Don't have an account? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Register Here</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <AppButton title='LOGIN' onPress={login}/>
            </View>
            { success ? null : <Text style={styles.errorText}>{error}</Text>}
          </View>
          }
        </View>   
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  formContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  label:{
    color: colors.white
  },
  input:{
    backgroundColor: colors.white
  },
  title:{
    fontSize: 40,
    marginBottom: 60
  },
  iconText:{
    display : 'flex',
  },
  buttonContainer:{
    width: '100%',
    marginTop:30,
    display:'flex',
    alignItems:'center'
  },
  registerLink:{
    fontSize: 15
  },
  link:{
    color: 'blue'
  },
  errorText:{
    color: 'red',
    fontSize : 15,
    marginTop: 10
  }
});

export default Login;