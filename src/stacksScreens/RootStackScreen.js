import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Register from '../components/Register';

const RootStack = createStackNavigator();

export default function RootStackScreen() {
  return (
    <RootStack.Navigator initialRouteName='Home'>
      <RootStack.Screen name='Login' component={Login} />
      <RootStack.Screen name='Register' component={Register} />
    </RootStack.Navigator>
  )
}