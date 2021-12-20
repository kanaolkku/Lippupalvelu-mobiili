import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Register = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const saveUser = () => {
    const body = {
      username: username,
      passwordHash: password,
      role: "USER"
    }
    fetch('https://lippupalvelu.herokuapp.com/api/users/save', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POSt",
      body: JSON.stringify(body)
    }
    )
      .then(data => data.json())
      .then(data => {
        setUsername("");
        setPassword("");
        navigation.navigate("Login");
      })
      .catch(err => console.log(err.message))
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffe396" }}>
      <Text style={styles.h1}>Register a new account!</Text>
      <Text>Username</Text>
      <TextInput style={styles.inputfield}
        value={username}
        onChangeText={(t) => setUsername(t)} />
      <Text>Password</Text>
      <TextInput style={styles.inputfield} secureTextEntry={true}
        value={password}
        onChangeText={(t) => setPassword(t)} />
      <Button title="Create account" onPress={() => saveUser()} />
    </View>
  )
}

export default Register;

const styles = StyleSheet.create({
  inputfield: {
    width: 300,
    height: 50,
    fontSize: 20,
    backgroundColor: "#ffc421",
    borderColor: "transparent",
    paddingHorizontal: 25,
    borderRadius: 50,
    borderWidth: 4,
    marginBottom: 5
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