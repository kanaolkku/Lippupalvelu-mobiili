import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

const Tickets = ({ navigation }) => {
  const [ticketList, setTicketList] = useState([]);

  const getTickets = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken')
      fetch('https://lippupalvelu.herokuapp.com/api/tickets/user', {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })
        .then(data => data.json())
        .then(data => setTicketList(data))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(async () => {
    getTickets();
    const unsubscribe = navigation.addListener('focus', () => getTickets())
    return unsubscribe;
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#ffe396",
        alignItems: 'center'
      }}>
      {ticketList.length < 1
        ?
        <Text style={{ fontSize: 22, textAlign: "center" }}>You currently do not have any tickets</Text>
        :
        <FlatList
          data={ticketList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View style={styles.eventView}>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.biggerText}>{item.event.title}</Text>
                <Text>{item.event.startDate}</Text>
                <Text>{item.event.startTime}</Text>
                <Text>{"Redeemed: " + item.redeemed}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                navigation.navigate("Ticket", {
                  ticket: item
                })
              }}>
                <View style={{
                  backgroundColor: '#ff9408',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderLeftColor: "black",
                  borderLeftWidth: 2,
                  width: 120,
                  height: 100,
                }}
                >
                  <Text style={{ color: 'white', fontSize: 22 }}>View</Text>
                </View>
              </TouchableOpacity>

            </View>
          }
        />
      }
    </View >
  )
}

export default Tickets;

const styles = StyleSheet.create({
  eventView: {
    backgroundColor: "#FFFFFF",
    borderColor: "black",
    color: "white",
    borderWidth: 1,
    width: windowWidth - 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 10,
    overflow: "hidden"

  },
  biggerText: {
    fontSize: 20,
  },
  baseText: {
    fontSize: 16
  }
});