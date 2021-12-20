import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Dimensions, TextInput } from 'react-native';
import { AuthContext } from '../utils/context';
const windowWidth = Dimensions.get('window').width;

const EventScreen = ({ navigation }) => {
  const [eventList, setEventList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState("");


  useEffect(() => {
    fetch('https://lippupalvelu.herokuapp.com/api/events/')
      .then(data => data.json())
      .then(data => {
        setEventList(data)
        setFilteredList(data);
      })
      .catch(err => err.message);
  }, [])

  const filterEvents = () => {
    const events = eventList;
    const filteredEvents = events.filter(event => event.title.toLowerCase().includes(filter.toLowerCase()));
    setFilteredList(filteredEvents);
    setFilter("");
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffe396"
      }}>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          style={{ backgroundColor: "white", paddingVertical: 20, marginVertical: 3, paddingLeft: 10, width: 300 }}
          placeholder='Search'
          value={filter}
          onChangeText={(text) => setFilter(text)}
        />
        <Button title='Search' onPress={filterEvents} />
      </View>

      <FlatList
        data={filteredList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.eventView} key={item.key}>
            <Text style={styles.biggerText}>{item.title}</Text>
            <Text style={styles.baseText}>{item.startDate}</Text>
            <Text style={styles.baseText}>{item.startTime}</Text>
            <Text style={styles.baseText}>{item.price} €</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Event', {
                eventItem: item
              })
            }}>
              <View style={{
                backgroundColor: '#ff9408',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftColor: "black",
                width: "100%",
                height: 40,
              }}
              >
                <Text style={{ color: 'white', fontSize: 22 }}>View</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}
export default EventScreen;



const styles = StyleSheet.create({
  eventView: {
    backgroundColor: "#FFFFFF",
    borderColor: "black",
    color: "white",
    borderWidth: 1,
    width: windowWidth - 10,
    marginBottom: 8,
  },
  biggerText: {
    fontSize: 20,
    padding: 5
  },
  baseText: {
    fontSize: 16,
    paddingLeft: 5
  }
});