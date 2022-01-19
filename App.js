import { StyleSheet, Text, View } from 'react-native';
import  React, { useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux'
import Login from './src/screens/Login';
import Account from './src/screens/Account';
import { setCustomText } from 'react-native-global-props';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import { Provider, useSelector } from 'react-redux'
import store from './src/store/store'
import * as Progress from 'react-native-progress';
import * as SecureStore from 'expo-secure-store';
import { fetchUserData } from './src/store/actions/index'
import ChooseTicketType from './src/screens/ChooseTicketType';

const Stack = createNativeStackNavigator();

function App() {
  const isLogged = useSelector((state) => state.auth.isLogged)
  const [isBusy, setBusy] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token)=>{
      if(token){
        dispatch(fetchUserData(token)).then(() =>{
          setBusy(false)
        })
      }else{
        setBusy(false)
      } 
    }).catch(()=>{
      console.log('No Token')
    })
  },[])

  return (
    <Provider store={store}>
      { isBusy ? <View style={styles.container}><Progress.Bar size={800} indeterminate={true} borderWidth={5} color={'black'}/></View> : 
      isLogged ?
      <NavigationContainer>
        <Stack.Navigator> 
          <Stack.Screen
          name='LoggedIn'
          component={LoggedIn}
          options={{ headerShown: false }}
          />
      </Stack.Navigator>
      </NavigationContainer>
      : 
      <NavigationContainer>

        <Stack.Navigator> 
        <Stack.Screen
        name='Auth'
        component={Auth}
        options={{ headerShown: false }}
        />
        </Stack.Navigator>
      </NavigationContainer>
      }
{/* 
      { isBusy ? <View style={styles.container}><Progress.Bar size={800} indeterminate={true} borderWidth={5} color={'black'}/></View> : 
      
      isLogged ? <LoggedIn/> : <Auth/> } */}

    </Provider>
  );
}

function Auth() {
  return(
      <Stack.Navigator>
        <Stack.Screen
        name="Login"
        component={Login}
        />
        <Stack.Screen
        name="Register"
        component={Register}
        />
      </Stack.Navigator>
  )
}

function LoggedIn() {
  return(
    <Stack.Navigator>
      <Stack.Screen
      name="Home"
      component={Home}
      />
      <Stack.Screen
      name="ChooseTicketType"
      component={ChooseTicketType}
      />
      <Stack.Screen
      name="Account"
      component={Account}
      />
    </Stack.Navigator>
  )
}

export default function AppWrapper () {
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif-thin'
  },
});


const customText = {
  style: {
    fontFamily: 'sans-serif'
  }
}

setCustomText(customText)