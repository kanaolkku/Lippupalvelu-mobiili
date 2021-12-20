import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tickets from '../components/Tickets';
import Ticket from '../components/Ticket';

const TicketsStack = createStackNavigator();

export default function TicketsStackScreen() {
  return (
    <TicketsStack.Navigator initialRouteName='TicketsScreen'>
      <TicketsStack.Screen name='TicketsScreen' component={Tickets}
        options={{ title: "Tickets" }} />
      <TicketsStack.Screen name='Ticket' component={Ticket} />
    </TicketsStack.Navigator>
  )
}