import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Profile from './Profile';
import Tickets from './Tickets';
import ShoppingCart from './ShoppingCart';

const LoginScreen = ({ navigation }) => {
  const [eventList, setEventList] = useState([
    { title: "chicken" }, { title: "beef" }
  ]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center', justifyContent: 'center'
      }}>
      <Text>Homehomehome</Text>
      <Button title='search' onPress={() => navigation.navigate('Login')} />
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  eventView: {
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 0.5
  }
});