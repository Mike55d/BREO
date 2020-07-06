import React ,{useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Switch,
} from 'react-native';

import Header from '../Header/Header';
import styles from './styles';
import { FontAwesome5 } from '@expo/vector-icons';

const Recibir = () =>{
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.switchRow}>
    <View style={styles.textSwitchContainer}>
    <Text>Recibir...</Text>
    </View>
    <View style={styles.switchContainer}>
      <Text style={{fontWeight:'bold'}}>A domicilio</Text>
      <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f0a500" : "#f4f3f4"}
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={styles.switch}
      />
      <Text>En el local</Text>
    </View>
  </View>
  )
}

const Pago = () =>{
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.switchRow}>
    <View style={styles.textSwitchContainer}>
    <Text>Pago...</Text>
    </View>
    <View style={styles.switchContainer}>
      <Text style={{fontWeight:'bold'}}>Efectivo</Text>
      <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f0a500" : "#f4f3f4"}
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={styles.switch}
      />
      <Text>Tarjeta</Text>
    </View>
  </View>
  )
}

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
        <Text style={[styles.nombreComercio,styles.textDark]}>Vino Blanco Sinergia</Text>
      </View>
      <View style={styles.quantityRow}>
        <Text style={[{fontSize:12},styles.textDark]}>(x1)</Text>
        <Text style={[{fontSize:12},styles.textDark]}>$1234</Text>
      </View>
      <View style={styles.iconsRow}>

      </View>
    </View>
  </View>
  )
}

const Pedido = ({navigation}) => {

  return (
    <>
      <Header
        textHeader="Resumen del pedido"
        showSearch={false}
        navigation={navigation}
        back={true}
      />
      <View style={{ flex: 1 }}>
        {/* TOP BAR  */}
        <View style={[styles.topBar, { flex: 0.25 }]}>
          <Text>Domicilio: <Text style={{ fontWeight: 'bold' }}>San Jeronimo 3167. Santa Fe</Text></Text>
          <Recibir />
          <Pago />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Queres dejar una aclaracion ?"
            style={styles.aclaracionInput} />
        </View>
        <View style={styles.containerCards}>
          <ScrollView>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </ScrollView>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
          <Text>Subtotal: <Text style={{ fontWeight: "bold" }}>$5702</Text></Text>
        </View>
        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableWithoutFeedback onPress={() => console.log('pressed')}>
            <View style={{ backgroundColor: 'green', padding: 10, paddingTop: 2, borderRadius: 50 }}>
              <FontAwesome5 name="whatsapp" size={60} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.footerContainer}></View>
      </View>
    </>
  )
}

export default Pedido;