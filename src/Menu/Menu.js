import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
	Linking
} from 'react-native';

import styles from './styles';
import {connect} from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import {logout} from '../actions/auth';
import {setAddress} from '../actions/direccion';


const Item = ({text , nagivation , screen , back = false}) => {
  return(
    <TouchableWithoutFeedback 
    onPress={() => nagivation.jumpTo(screen,{back:back})}>
      <View style={styles.itemContainer}>
        <Text numberOfLines={1} style={styles.textItem}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}


const Menu = ({navigation, dispatch}) => {

  const sendWhatsApp = () =>{
    Linking.openURL(`whatsapp://send?text=hola...&phone=+5493425789748`)
  }

  const Logout = async ()=>{
    await GoogleSignIn.signOutAsync();
    dispatch(setAddress(null));
    dispatch(logout());
  }
  return (
    <>
      <View style={{ flex: 1 ,backgroundColor:'#f5f5f5'}}>
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
          <TouchableWithoutFeedback
            onPress={() => sendWhatsApp()}>
              <View style={styles.itemContainer}>
                <Text style={styles.textItem}>Contactanos</Text>
              </View>
          </TouchableWithoutFeedback>
          <Item
            screen='Terminos'
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
        {/* <View style={styles.footer}>
        </View> */}
      </View>
    </>
  )
}

export default connect()(Menu);