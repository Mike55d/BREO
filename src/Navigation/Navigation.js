import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home/Home';
import Login from '../Login/Login';


const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}