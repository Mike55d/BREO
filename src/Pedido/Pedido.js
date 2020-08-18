import React ,{useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Switch,
  Linking,
  SafeAreaView
} from 'react-native';

import Header from '../Header/Header';
import styles from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import {routeImages} from '../actions/routePanel';
import {connect} from 'react-redux';


const Recibir = ({toggleRecibir , isEnabled}) =>{
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
      onValueChange={()=>toggleRecibir()}
      value={isEnabled}
      style={styles.switch}
      />
      <Text>En el local</Text>
    </View>
  </View>
  )
}

const Pago = ({togglePago , isEnabled}) =>{
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
      onValueChange={()=>togglePago()}
      value={isEnabled}
      style={styles.switch}
      />
      <Text>Tarjeta</Text>
    </View>
  </View>
  )
}

const Card = ({item}) => {
  return (
    <View style={styles.cardContainer}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.cardImage}
        source={{uri:routeImages+item.producto.imagen}}
      />
    </View>
    <View style={styles.textContainer}>
      <View style={styles.textRow}>
        <Text style={[styles.nombreComercio,styles.textDark]}>{item.producto.nombre}</Text>
      </View>
      <View style={styles.quantityRow}>
        <Text style={[{fontSize:12},styles.textDark]}>(x{item.cantidad})</Text>
        <Text style={[{fontSize:12},styles.textDark]}>${item.producto.precio}</Text>
      </View>
      <View style={styles.iconsRow}>

      </View>
    </View>
  </View>
  )
}

const Pedido = ({navigation , route , user , direccion}) => {
  const pedido = route.params.pedido;
  const subtotoal = route.params.subtotal;
  const comercio = route.params.comercio;
  const [aclaraciones,setAclaraciones] = useState(null);
  const [recibir, setRecibir] = useState(false);
  const [pago, setPago] = useState(false);

  const togglePago = () =>{
    setPago(!pago);
  }

  const toggleRecibir = () =>{
    setRecibir(!recibir);
  }

  const sendWhatsApp = () =>{
    let urlMap = `https://www.google.com/maps/search/?api=1&query=${direccion.lat},${direccion.long}`;
    let flatAddress = `${direccion.provincia} ${direccion.ciudad} ${direccion.calles} ${direccion.domicilio}`;
    let text = `Hola soy ${user.firstName} ${user.lastName} y este es mi pedido a través de la app BREO \n`;
    pedido.forEach(item =>{
      text+=`${item.producto.nombre} (x${item.cantidad}) \n`;
    });
    text+=`Aclaraciones: ${aclaraciones}\n`;
    text+=`Mi dirección es: ${direccion.lat ? urlMap : flatAddress}\n`;
    text+=`Voy a solicitar el producto o servicio: ${recibir ? 'En el local':'A domicilio'} \n`;
    text+=`El pago será con: ${pago ? 'Tarjeta' : 'Efectivo' } \n`;
    text+=`Total: $${subtotoal}\n`;
    text+=`Muchas gracias!`;
    Linking.openURL(`whatsapp://send?text=${text}&phone=${comercio.whatsApp}`)
  }

  return (
    <>
      <Header
        textHeader={`${direccion.provincia} ${direccion.ciudad} ${direccion.domicilio}`}
        showSearch={false}
        navigation={navigation}
        back="Comercio"
      />
      <ScrollView >
        {/* TOP BAR  */}
        <View style={[styles.topBar, { flex: 1.5 }]}>
          {/* <Text>Domicilio: <Text style={{ fontWeight: 'bold' }}>{direccion.provincia} {direccion.ciudad} {direccion.domicilio}</Text></Text> */}
          <Recibir toggleRecibir={toggleRecibir} isEnabled={recibir}/>
          <Pago togglePago={togglePago} isEnabled={pago}/>
          <TextInput
            placeholderTextColor="gray"
            placeholder="Queres dejar una aclaracion ?"
            style={styles.aclaracionInput}
            value={aclaraciones}
            onChangeText={(text)=> setAclaraciones(text)}
            />
        </View>
        <View style={styles.containerCards}>
          <ScrollView>
            {pedido ? (
              pedido.map(item =>
                <Card key={item.producto.id} item={item} />
              )
            ):(null)}
          </ScrollView>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
          <Text>Subtotal: <Text style={{ fontWeight: "bold" }}>${subtotoal}</Text></Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableWithoutFeedback onPress={() => sendWhatsApp()}>
            <View style={{ backgroundColor: 'green', padding: 10, paddingTop: 2, borderRadius: 50 }}>
              <FontAwesome5 name="whatsapp" size={45} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* <View style={styles.footerContainer}></View> */}
      </ScrollView>
    </>
  )
}

const mapStateToProps = (state) => ({
  user:state.auth,
  direccion:state.direccion
})

export default connect(mapStateToProps)(Pedido);