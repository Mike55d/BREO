import React,{useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Comercios from '../Comercios/Comercios';
import Comercio from '../Comercio/Comercio';
import Pedido from '../Pedido/Pedido';
import MiDireccion from '../MiDireccion/MiDireccion';
import Menu from '../Menu/Menu';
import {connect} from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import {loginSuccess} from '../actions/auth'

const Drawer = createDrawerNavigator();

 const  Navigation = ({user,dispatch}) => {

  const getUser = async () =>{
    let userGoogle = await GoogleSignIn.getCurrentUserAsync();
    if(userGoogle){
      dispatch(loginSuccess(userGoogle));
    }
  }
  useEffect(() =>{
    if(!user){
      getUser();
    }
  });

  return (
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="Home"
      drawerStyle={{
        width: 320,
      }} 
      drawerContent={(props) => <Menu {...props}/>}
      >
        {user ?(
          <>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Comercios" component={Comercios} />
          <Drawer.Screen name="Comercio" component={Comercio} />
          <Drawer.Screen name="Pedido" component={Pedido} />
          <Drawer.Screen name="MiDireccion" component={MiDireccion} />
          </>
        ):(
          <Drawer.Screen name="Login" component={Login} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) =>({
  user:state.auth
})

export default connect(mapStateToProps)(Navigation);