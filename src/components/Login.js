import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../utils/context';
import { APILogin } from '../utils/UserDetails';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { signIn } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffe396" }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Text style={styles.h1}>Log In!</Text>
        <Text>Username</Text>
        <TextInput style={styles.inputfield}
          value={username}
          onChangeText={(t) => setUsername(t)}
        />
        <Text>Password</Text>
        <TextInput style={styles.inputfield}
          value={password}
          onChangeText={(t) => setPassword(t)}
          secureTextEntry={true}
        />
        <View style={{ marginVertical: 10 }}>
          <Button title='Log in' onPress={() => signIn(username, password)} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button title='Click here to register!' onPress={() => navigation.navigate("Register")} />
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  inputfield: {
    width: 300,
    height: 50,
    fontSize: 20,
    backgroundColor: "#ffc421",
    borderColor: "transparent",
    paddingHorizontal: 25,
    borderRadius: 50,
    borderWidth: 4
  },
  label: {
    fontSize: 24,
    color: "white"
  },
  h1: {
    fontSize: 36,
    color: "#401d00",
    fontWeight: "800",
    marginBottom: 5
  }
})

export default Login;