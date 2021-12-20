import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventScreen from '../components/EventScreen';
import Event from '../components/Event';


const EventStack = createStackNavigator();

export default function EventsStackScreen() {
  return (
    <EventStack.Navigator initialRouteName='EventsScreen'>
      <EventStack.Screen name='EventsScreen' component={EventScreen} options={{ title: "Events" }} />
      <EventStack.Screen name='Event' component={Event} />
    </EventStack.Navigator>
  )
}