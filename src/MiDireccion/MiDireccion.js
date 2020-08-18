import React,{useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
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

  const getLocation = async() => {
    dispatch(loaderOn());
    let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
    let location = await Location.getCurrentPositionAsync({});
    let addressLocation = await Location.reverseGeocodeAsync(location.coords);
    console.log(addressLocation[0]);
    SetAddress({
      ...address,
      provincia:addressLocation[0].region,
      ciudad:addressLocation[0].city,
      calles:addressLocation[0].street,
      domicilio:addressLocation[0].name,
      lat:location.coords.latitude,
      long:location.coords.longitude
    })
    dispatch(loaderOff());
  }

  const updateAddress = () =>{
    if(!address.provincia || !address.ciudad || !address.calles || !address.domicilio || !address.pisoDepto){
      alert('Por favor llene todos los campos');
      return;
    }
    dispatch(loaderOn());
    Axios.post(routePanel+'users/updateAddress',address)
    .then(response =>{
      alert('Direccion actualizada correctamente');
      dispatch(setAddress(address))
      dispatch(loaderOff());
    })
    .catch(error=>{
      console.log(error);
      dispatch(loaderOff());
    });
  }


  useEffect(()=>{
    if(!direccion){
      dispatch(getAddress(user.email));
    }
  })

  useEffect(()=>{
    console.log(address);
  },[address])
  

  useEffect(()=>{
    if(direccion){
      SetAddress({...direccion,email:user.email});
    }
  },[direccion]);

  return (
    <>
    <Header
      showSearch={false}
      textHeader="Mi Direccion"
      back={back ? back:false}
      navigation={navigation}
    />
    <Text style={styles.textHead}>Datos de mi direccion</Text>
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
            placeholder="Domicilio *"
            style={styles.formInput}
            value={address.domicilio}
            onChangeText={(text) => SetAddress({...address,domicilio:text})}
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
            placeholder="Piso / depto *"
            style={styles.formInput}
            value={address.pisoDepto}
            onChangeText={(text) => SetAddress({...address,pisoDepto:text})}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Latitud"
            style={styles.formInput}
            editable={false}
            value={address.lat ? String(address.lat):''}
            onChangeText={(text) => SetAddress({...address,lat:text})}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Longitud"
            editable={false}
            style={styles.formInput}
            value={address.long ? String(address.long):''}
            onChangeText={(text) => SetAddress({...address,long:text})}
          />

          <TouchableHighlight
            style={styles.button}
            underlayColor="#d6efc7"
            onPress={() => getLocation()}
          >
            <Text style={{ color: '#393e46' }}>Detectar Ubicacion</Text>
          </TouchableHighlight>
          <TouchableWithoutFeedback
            onPress={() => updateAddress()}
          >
            <View style={styles.buttonActualizar}>
              <Text style={styles.textActualizar}>Actualizar</Text>
            </View>
          </TouchableWithoutFeedback>
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