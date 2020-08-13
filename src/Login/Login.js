import React,{useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import styles from './styles';
import * as GoogleSignIn from 'expo-google-sign-in';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {loaderOn,loaderOff} from '../actions/loader';
import Loader from '../Loader/Loader';

const Login = ({dispatch}) =>{

  const initAsync = async () => {
    await GoogleSignIn.initAsync();
    this._syncUserWithStateAsync();
  };
  useEffect(()=>{
    initAsync();
  })

  const signInAsync = async () =>{
    dispatch(loaderOn());
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        dispatch(login(user));
      }else{
        dispatch(loaderOff());
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
      dispatch(loaderOff());
    }
  }

  return (
    <>
    <Loader/>
    <ImageBackground 
    source={require('../../assets/background.png')}
    imageStyle={{resizeMode:"cover"}}
    style={{flex:1}}
    >
      <View style={styles.column}>
        <View style={styles.containerLogo}>
          <Image style={styles.logo} source={require('../../assets/logo.png')} />
        </View>
        <View style={styles.containerFooter}>
          <TouchableHighlight 
          underlayColor="#f4f6ff"
          style={styles.googleButton}
          onPress={()=> signInAsync()}
          >
            <Text>Sign in with Google</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ImageBackground>
    </>
  )
}

export default connect()(Login);