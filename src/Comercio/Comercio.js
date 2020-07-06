import React ,{useState} from 'react';
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
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const onSearch = (text) =>{
  console.log(text);
}

const TopBar = () => {
  return (
    <View style={styles.topBarContainer}>
      <Text style={styles.textBold}>Nombre del comercio <Text style={styles.textSlim}>(Rubro)</Text></Text>
      <View style={styles.topbarIcons}>
        <MaterialCommunityIcons name="truck" size={13} color="#111d5e" style={{ opacity: 0.8 }} />
        <Text style={styles.textIcon}>Horarios de envio</Text>
      </View>
      <View style={styles.topbarIcons}>
        <Foundation name="credit-card" size={15} color="#111d5e" style={{ opacity: 0.8 }} />
        <Text style={styles.textIcon}>Formas de pago con tarjeta</Text>
      </View>
      <View style={styles.topbarIcons}>
        <Feather name="map-pin" size={12} color="#111d5e" style={{ opacity: 0.8 }} />
        <Text style={styles.textIcon}>Direccion del local, Ciudad</Text>
      </View>
    </View>
  )
}

const Card = () => {
  const [count , setCount] = useState(0);
  const increase = () => setCount(count + 1);
  const decrease = () => {
    if(count > 0){
      setCount(count - 1)
    }
  };
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
          <Text style={[styles.headerCard, styles.textDark]}>Vino Blanco Sinergia</Text>
          <Text numberOfLines={2} style={[styles.textContent ,styles.textDark]}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nihil error impedit fugit animi ipsam, sint officia odit debitis enim quae harum alias reprehenderit sequi, magnam dolorem optio excepturi quas.</Text>
        </View>
        <View style={styles.countRow}>
          <View style={styles.counterContainer}>
            <View style={styles.itemRow}>
              <TouchableWithoutFeedback
                onPress={() => decrease()}
              >
              <AntDesign name="minus" size={16} color="#111d5e" />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.itemRow}>
              <Text style={{color:'#111d5e'}}>{count}</Text>
            </View>
            <View style={styles.itemRow}>
              <TouchableWithoutFeedback
                onPress={() => increase()}
              >
              <FontAwesome5 name="plus" size={10} color="#111d5e" />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Text style={{fontSize:12,padding:5 , color:'#111d5e'}}>$1234</Text>
        </View>
      </View>
    </View>
  )
}

const Comercio = ({navigation}) => {
  return (
    <>
    <Header 
      showSearch={true}
      placeholder="Buscar en el catalogo"
      onSearch={onSearch}
      navigation={navigation}
      back={true}
    />
      <TopBar/>
      <ScrollView contentContainerStyle={{paddingTop:10}}>
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
        <View style={styles.subtotalContainer}>
          <Text>Subtotal del pedido: <Text style={styles.textTotal}>$5702</Text></Text>
          <Text style={styles.textTotal}>Ver resumen</Text>
        </View>
        <View style={styles.footerContainer}>
        </View>
    </>
  )
}

export default Comercio;