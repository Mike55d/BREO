import React,{useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ToastAndroid,
  Alert
} from 'react-native';

import styles from './styles';
import Header from '../Header/Header';
import * as Location from 'expo-location';
import {connect} from 'react-redux';
import {loaderOn,loaderOff} from '../actions/loader';
import {getAddress, setAddress} from '../actions/direccion';
import Axios from 'axios';
import {routePanel} from '../actions/routePanel';

const MiDireccion = ({navigation,dispatch , user, direccion , route}) => {
  const [address,SetAddress] = useState(direccion);
  const back = route.params ? route.params.back : false;

  const updateAddress = () =>{
    console.log('request',address);
    dispatch(loaderOn());
    Axios.post(routePanel+'users/updateAddress',address)
    .then(response =>{
      ToastAndroid.show('Direccion actualizada',ToastAndroid.SHORT);
      dispatch(setAddress(address));
      dispatch(loaderOff());
      SetAddress({...address,email:null});
    })
    .catch(error=>{
      console.log(error);
      dispatch(loaderOff());
    });
  }



  const getLocation = async() => {
    if(!address.provincia || !address.ciudad || !address.calles || !address.calle || !address.pisoDepto){
      Alert.alert('Campos incompletos','Por favor llene todos los campos');
      return;
    }
    dispatch(loaderOn());
    let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
    let addressString = `${address.provincia} ${address.ciudad} ${address.calle} ${address.numero}`
    let addressLocation = await Location.geocodeAsync(addressString);
    console.log('location',addressLocation[0].longitude);
    SetAddress({
      ...address,
      lat:addressLocation[0].latitude,
      long:addressLocation[0].longitude,
      email:user.email
    });
    dispatch(loaderOff());
  }

  useEffect(()=>{
    console.log('effect',address);
    if(address.email){
      console.log('hay email');
      updateAddress();
    }
  },[address])

  return (
    <>
    <Header
      showSearch={false}
      textHeader="Mi Direccion"
      back={back ? back:false}
      navigation={navigation}
    />
      {address ? (
        <View style={styles.formContainer}>
          <TextInput
            placeholderTextColor="gray"
            placeholder="Provincia *"
            style={styles.formInput}
            value={address.provincia}
            onChangeText={(text) => SetAddress({...address,provincia:text})}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Ciudad *"
            style={styles.formInput}
            value={address.ciudad}
            onChangeText={(text) => SetAddress({...address,ciudad:text})}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Calle *"
            style={styles.formInput}
            value={address.calle}
            onChangeText={(text) => SetAddress({...address,calle:text})}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Numero *"
            style={styles.formInput}
            value={address.numero}
            onChangeText={(text) => SetAddress({...address,numero:text})}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Entre calles *"
            style={styles.formInput}
            value={address.calles}
            onChangeText={(text) => SetAddress({...address,calles:text})}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Piso / depto o caracteristicas *"
            style={styles.formInput}
            value={address.pisoDepto}
            onChangeText={(text) => SetAddress({...address,pisoDepto:text})}
          />
          <TouchableHighlight
            style={styles.button}
            underlayColor="#d6efc7"
            onPress={() => getLocation()}
          >
            <Text style={{ color: '#212a42' }}>Confirmar Ubicacion</Text>
          </TouchableHighlight>
        </View>
      ) : (null)}
    </>
  )
}

const mapStateToProps = (state) =>({
  user:state.auth,
  direccion:state.direccion
})

export default connect(mapStateToProps)(MiDireccion);