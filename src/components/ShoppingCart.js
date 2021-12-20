import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingCart = ({ navigation }) => {
  const [cartEvents, setCartEvents] = useState([]);

  const getCartItems = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('shoppingCartItems');
      if (cartItems) {
        setCartEvents(JSON.parse(cartItems));
      }
    } catch (err) {
      console.log(err)
    }
  }

  const changeCount = async (item, type) => {
    let newItem = item;
    let newEvents = cartEvents;
    const itemIndex = newEvents.findIndex(item => item.eventId === newItem.eventId)
    try {
      if (type === "decrement") {
        if (newItem.count === 1) {
          newEvents.splice(itemIndex, 1);
        } else {
          newItem.count--;
          newEvents[itemIndex] = newItem;
        }
        await AsyncStorage.setItem('shoppingCartItems', JSON.stringify(newEvents))
        getCartItems();
      } else if (type === "increment") {
        newItem.count++
        newEvents[itemIndex] = newItem;
        await AsyncStorage.setItem('shoppingCartItems', JSON.stringify(newEvents))
        getCartItems();
      }
    } catch (err) {
      console.log(err)
    }
  }

  const calcTotal = () => {
    const events = cartEvents;
    let amount = 0;

    events.forEach(event => {
      const priceInt = parseInt(event.price);
      const countInt = parseInt(event.count);
      const total = priceInt * countInt;
      amount += total;
    });
    return amount.toString();
  }

  useEffect(async () => {
    getCartItems();

    const unsubscribe = navigation.addListener('focus', () => getCartItems())

    return unsubscribe;
  }, [])

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('shoppingCartItems');
      setCartEvents([])
    } catch (err) {
      console.log(err)
    }
  }

  const submitOrder = async () => {
    //luodaan tapahtumataulukko, mihin laitetaan tapahtumat
    const eventBody = []
    //haetaan cartist tapahtumat
    const events = cartEvents;
    //jokaiselle tapahtumalle lisätään sen countin määrän mukaan tapahtumia bodyyn
    events.forEach(event => {
      for (let i = 0; i < event.count; i++) {
        eventBody.push(event.eventId);
      }
    })

    try {
      let userToken = await AsyncStorage.getItem('userToken');
      //luodaan fetch pyyntö
      fetch('https://lippupalvelu.herokuapp.com/api/orders/save', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(eventBody)
      })
        .then(data => data.json())
        .catch(err => err.message)

      //tyhjennetään asyncstorage ja päivitetään cartEvents
      await AsyncStorage.setItem('shoppingCartItems', JSON.stringify([]))
      getCartItems();
      navigation.navigate('Tickets');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffe396" }}>
      <View style={{ marginVertical: 10 }}>
        <Button title='clear cart' onPress={() => clearCart()} />
      </View>
      <FlatList
        data={cartEvents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.eventView}>
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={styles.biggerText}>{item.title}</Text>
              <Text style={styles.baseText}>{item.startDate}</Text>
              <Text style={styles.baseText}>{item.startTime}</Text>
            </View>
            <View style={{ flex: 1 }}>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                  changeCount(item, "decrement");
                }}>
                  <View style={{ backgroundColor: "blue", alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 5 }}>
                    <Text style={{ color: "white", fontSize: 20, paddingBottom: 4, paddingHorizontal: 10 }}>-</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>{item.count}</Text>
                <TouchableOpacity onPress={() => changeCount(item, "increment")}>
                  <View style={{ backgroundColor: "blue", alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 5 }}>
                    <Text style={{ color: "white", fontSize: 20, paddingBottom: 4, paddingHorizontal: 10 }}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.baseText}>
                {`${item.price}€ x ${item.count} = ${item.price * item.count}€`} </Text>
            </View>
          </View>
        }
      />
      <View style={{ borderColor: "black", borderWidth: 1, backgroundColor: "white", }}>
        <Text style={{ fontSize: 22, padding: 10 }}>Your total is: {calcTotal()} €</Text>
        <Button title='Order now!' onPress={() => submitOrder()} />
      </View>
    </View >
  )
}

export default ShoppingCart;

const styles = StyleSheet.create({
  eventView: {
    backgroundColor: "#FFFFFF",
    borderColor: "white",
    color: "white",
    borderWidth: 0.5,
    marginBottom: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  biggerText: {
    fontSize: 20,
  },
  baseText: {
    fontSize: 16
  }
});