import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import ShoppingCart from '../components/ShoppingCart';

const ShoppingCartStack = createStackNavigator();

export default function ShoppingCartStackScreen() {
  return (
    <ShoppingCartStack.Navigator initialRouteName='Shopping Cart Screen'>
      <ShoppingCartStack.Screen name='Shopping Cart Screen' component={ShoppingCart}
        options={{ title: "Shopping Cart" }} />
    </ShoppingCartStack.Navigator>
  )
}