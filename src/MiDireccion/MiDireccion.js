import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';

import styles from './styles';
import Header from '../Header/Header';

const MiDireccion = ({navigation}) => {
  return (
    <>
    <Header
      showSearch={false}
      textHeader="Mi Direccion"
      back={false}
      navigation={navigation}
    />
    <Text style={styles.textHead}>Datos de mi direccion</Text>
    <View style={styles.formContainer}>
    <TextInput
      placeholderTextColor="gray"
      placeholder="Provincia *"
      style={styles.formInput} />
      <TextInput
      placeholderTextColor="gray"
      placeholder="Ciudad *"
      style={styles.formInput} />
      <TextInput
      placeholderTextColor="gray"
      placeholder="Domicilio *"
      style={styles.formInput} />
      <TextInput
      placeholderTextColor="gray"
      placeholder="Entre calles *"
      style={styles.formInput} />
      <TextInput
      placeholderTextColor="gray"
      placeholder="Piso / depto *"
      style={styles.formInput} />
      <TouchableHighlight 
      style={styles.button}
      underlayColor="#d6efc7"
      onPress={() => console.log('pressed')}
      >
        <Text style={{color:'#393e46'}}>Detectar Ubicacion</Text>
      </TouchableHighlight>
      <TouchableWithoutFeedback 
      onPress={() => console.log('pressed')}
      >
        <View style={styles.buttonActualizar}>
        <Text style={styles.textActualizar}>Actualizar</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
    </>
  ) 
}

export default MiDireccion;