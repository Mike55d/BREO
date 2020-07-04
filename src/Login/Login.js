import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';


const Login = () =>{
  return (
    <>
    <StatusBar hidden={true}/>
      <View style={styles.column}>
        <View style={styles.containerLogo}>
          <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
        </View>
        <View style={styles.containerFooter}>
          <TouchableHighlight 
          underlayColor="#f4f6ff"
          style={styles.googleButton}
          onPress={()=> console.log('pressed')}
          >
            <Text>Sign in with Google</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  )
}

export default Login;