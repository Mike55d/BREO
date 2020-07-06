import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import Header from '../Header/Header';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 


const Card = () => {
  return (
    <View style={styles.cardContainer}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.cardImage}
        source={require('../../assets/images/logo.png')}
      />
    </View>
    <View style={styles.textContainer}>
      <View style={styles.textRow}>
        <Text style={styles.nombreComercio}>Nombre del comercio</Text>
      </View>
      <View style={styles.iconsRow}>
        <MaterialCommunityIcons name="truck" size={13} color="black" style={{opacity:0.8}} />
        <Foundation name="credit-card" size={15} color="black" style={{opacity:0.8}} />
        <Feather name="map-pin" size={12} color="black" style={{opacity:0.8}} />
      </View>
    </View>
  </View>
  )
}

const Comercios = ({navigation}) => {
  return (
    <>
      <Header 
        showSearch={false}
        textHeader="Resultados"
        navigation={navigation}
        back={true}
      />
      <ScrollView>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </ScrollView>
    </>
  )
}

export default Comercios;