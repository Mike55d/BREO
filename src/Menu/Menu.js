import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';

import styles from './styles';
import {connect} from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import {logout} from '../actions/auth';
import {setAddress} from '../actions/direccion';


const Item = ({text , nagivation , screen}) => {
  return(
    <TouchableWithoutFeedback 
    onPress={() => nagivation.jumpTo(screen)}>
      <View style={styles.itemContainer}>
        <Text style={styles.textItem}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}


const Menu = ({navigation, dispatch}) => {

  const Logout = async ()=>{
    await GoogleSignIn.signOutAsync();
    dispatch(setAddress(null));
    dispatch(logout());
  }
  return (
    <>
    <StatusBar hidden={true}/>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={[styles.header, { flex: 0.07 }]}>
          <Text style={styles.headerText}>Menu</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Item
            screen='Home'
            text="Inicio"
            nagivation={navigation}
          />
          <Item
            screen='MiDireccion'
            text="Mi direccion actual"
            nagivation={navigation}
          />
          <Item
            screen='Home'
            text="Contactanos"
            nagivation={navigation}
          />
          <Item
            screen='Home'
            text="Terminos y condiciones"
            nagivation={navigation}
          />
          <TouchableWithoutFeedback 
            onPress={() => Logout()}>
              <View style={styles.itemContainer}>
                <Text style={styles.textItem}>Logout</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    </>
  )
}

export default connect()(Menu);