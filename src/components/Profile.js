import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState({});

  useEffect(async () => {

    try {
      const JsonUserDetails = await AsyncStorage.getItem('userDetails');
      const userDetails = JSON.parse(JsonUserDetails);
      setUserData(userDetails)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <View>
      <Text>Username: {userData.username}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>First name: {userData.firstName}</Text>
      <Text>Last Name: {userData.lastName}</Text>
      <Text> {userData.role}</Text>
    </View>
  )
}

export default Profile;