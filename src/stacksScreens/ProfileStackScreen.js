import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../components/Profile';


const ProfileStack = createStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator initialRouteName='Profile'>
      <ProfileStack.Screen name='Profile' component={Profile} />
    </ProfileStack.Navigator>
  )
}