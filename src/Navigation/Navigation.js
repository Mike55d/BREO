import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Comercios from '../Comercios/Comercios';
import Comercio from '../Comercio/Comercio';
import Pedido from '../Pedido/Pedido';
import MiDireccion from '../MiDireccion/MiDireccion';

import Menu from '../Menu/Menu';


const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="MiDireccion"
      drawerStyle={{
        width: 320,
      }} 
      drawerContent={(props) => <Menu {...props}/>}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Comercios" component={Comercios} />
        <Drawer.Screen name="Comercio" component={Comercio} />
        <Drawer.Screen name="Pedido" component={Pedido} />
        <Drawer.Screen name="MiDireccion" component={MiDireccion} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}