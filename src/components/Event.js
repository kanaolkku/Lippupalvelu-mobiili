import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function Event({ navigation, route }) {
  const event = route.params.eventItem;
  const [counter, setCounter] = useState(0);

  const addToCart = async () => {
    let eventItem = { ...event, count: counter };
    try {
      const cartItems = await AsyncStorage.getItem('shoppingCartItems');
      if (cartItems) {
        let items = JSON.parse(cartItems);
        // checks if exists in array
        if (items.some(item => item.eventId === event.eventId)) {
          //get index of object and update it
          const itemIndex = items.findIndex(item => item.eventId === event.eventId);
          let cartItem = items[itemIndex];
          cartItem.count = cartItem.count + counter;
          items.itemIndex = cartItem;
          await AsyncStorage.setItem('shoppingCartItems', JSON.stringify(items));
        } else {
          let newArr = items.concat(eventItem);
          await AsyncStorage.setItem('shoppingCartItems', JSON.stringify(newArr));
        }
      } else {
        const newCartArr = [eventItem]
        await AsyncStorage.setItem('shoppingCartItems', JSON.stringify(newCartArr))
      }
    } catch (err) {
      console.log(err)
    }
    setCounter(0);
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffe396" }}>
      <Text style={styles.biggerText}>{event.title}</Text>
      <Text style={styles.baseText}>{event.description}</Text>
      <Text style={styles.baseText}>{event.startDate}</Text>
      <Text style={styles.baseText}>{event.startTime}</Text>
      <Text style={styles.baseText}>Ticket limit: {event.ticketLimit}</Text>
      <Text style={styles.baseText}>{event.venue.name}</Text>
      <Text style={styles.baseText}>{event.venue.address}</Text>
      <View style={{ flexDirection: 'row' }}>{event.category.map(category => (<View style={{ backgroundColor: "#ffc421", margin: 5, borderRadius: 3 }}><Text style={{ padding: 7, textAlign: 'center' }}>{category.name} </Text></View>))}</View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={() => {
          if (counter === 0) {
            setCounter(0)
          } else {
            setCounter(counter - 1)
          }
        }}>
          <View style={{ backgroundColor: "blue", alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 5 }}>
            <Text style={{ color: "white", fontSize: 28, paddingBottom: 8, paddingHorizontal: 10 }}>-</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 28 }}>{counter}</Text>
        <TouchableOpacity onPress={() => setCounter(counter + 1)}>
          <View style={{ backgroundColor: "blue", alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 5 }}>
            <Text style={{ color: "white", fontSize: 28, paddingBottom: 8, paddingHorizontal: 10 }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Button title='Add to cart' onPress={() => {
        addToCart();
        navigation.navigate('Shopping Cart');
      }} />
    </View >
  )
}

const styles = StyleSheet.create({
  biggerText: {
    fontSize: 28,
    padding: 5
  },
  baseText: {
    fontSize: 16,
    paddingLeft: 5
  }
})