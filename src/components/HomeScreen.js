import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native";
import { AuthContext } from '../utils/context';


export default function HomeScreen({ navigation }) {

  const { signOut } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffe396" }}>
      <View style={{ marginBottom: 10, width: 300 }}>
        <Button title='Log out' onPress={() => signOut()} />
      </View>
      <View style={{ marginBottom: 10, width: 300 }}>
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  )
}