import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import Profile from '../components/Profile';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='HomeScreen'>
      <HomeStack.Screen name='HomeScreen' component={HomeScreen} options={{ title: "Home" }} />
      <HomeStack.Screen name='Profile' component={Profile} />
    </HomeStack.Navigator>
  )
}