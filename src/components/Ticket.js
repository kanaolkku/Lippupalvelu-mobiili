import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Ticket({ navigation, route }) {
  const ticket = route.params.ticket;
  return (
    <View>
      <Text>{ticket.event.title}</Text>
      <Text>{ticket.event.description}</Text>
      <Text>{ticket.event.startDate}</Text>
      <Text>{ticket.event.startTime}</Text>
      <Text>Ticket limit: {ticket.event.ticketLimit}</Text>
      <Text>{"Redeemed: " + ticket.redeemed}</Text>
      <Text>{ticket.event.venue.name}</Text>
    </View>
  )
}