
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './src/stacksScreens/HomeStackScreen';
import TicketsStackScreen from './src/stacksScreens/TicketsStackScreen';
import ShoppingCartStackScreen from './src/stacksScreens/ShoppingCartStackScreen';
import ProfileStackScreen from './src/stacksScreens/ProfileStackScreen';
import { AuthContext } from './src/utils/context';
import RootStackScreen from './src/stacksScreens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIDetails, APILogin } from './src/utils/UserDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventsStackScreen from './src/stacksScreens/EventsStackScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  //const [userToken, setUserToken] = useState(null)

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => (
    {
      signIn: async (username, password) => {
        //setUserToken('asdasd')
        //setIsLoading(false)
        // check from db aka api call with credentials --1--
        const tokens = await APILogin(username, password);
        let userToken = null;
        if (tokens) {
          userToken = tokens.access_token;
          const userData = await APIDetails(userToken);

          try {
            await AsyncStorage.setItem('userToken', userToken);
            const jsonUserData = JSON.stringify(userData);
            await AsyncStorage.setItem('userDetails', jsonUserData)
          } catch (err) {
            console.log(err)
          }


          dispatch({ type: 'LOGIN', id: username, token: userToken })
        } else {
          try {
            await AsyncStorage.removeItem('userToken')
          } catch (err) {
            console.log(err)
          }
        }

      },
      signOut: async () => {
        //setUserToken(null);
        //setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (err) {
          console.log(err)
        }
        dispatch({ type: 'LOGOUT' })
      },
      signUp: () => {
        setUserToken()
        setIsLoading(false)
      },

    }));

  useEffect(async () => {

    let userToken = null;

    try {
      userToken = await AsyncStorage.getItem('userToken')
    } catch (err) {
      console.log(err)
    }

    const data = await APIDetails(userToken);

    if (data.error_message) {
      dispatch({ type: "LOGOUT" })
    } else {
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center'
      }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'Events') {
                iconName = focused ? 'search' : 'search';
              } else if (route.name === 'Tickets') {
                iconName = focused ? 'wallet' : 'wallet';
              } else if (route.name === 'Shopping Cart') {
                iconName = focused ? 'cart' : 'cart';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ff9408',
            tabBarInactiveTintColor: 'white',
            tabBarActiveBackgroundColor: "#000000",
            tabBarInactiveBackgroundColor: "#000000"
          })}>
            <Tab.Screen name='Home' component={HomeStackScreen} />
            <Tab.Screen name='Events' component={EventsStackScreen} />
            <Tab.Screen name='Tickets' component={TicketsStackScreen} />
            <Tab.Screen name='Shopping Cart' component={ShoppingCartStackScreen} />
          </Tab.Navigator>
        )
          :
          <RootStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
