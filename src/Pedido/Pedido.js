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
import { Foundation } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const Recibir = ({toggleRecibir , isEnabled}) =>{
  return (
    <View style={styles.switchRow}>
    <View style={styles.textSwitchContainer}>
    <Text style={{color:'#212a42' , fontWeight:'bold'}}>Deseas recibirlo...</Text>
    </View>
    <View style={styles.switchContainer}>
      <TouchableWithoutFeedback
        onPress={()=> toggleRecibir()}
      >
        <View style={[styles.buttonSwitch,{backgroundColor:!isEnabled?'#ff5e00':'#f5f5f5'}]}>
        <MaterialCommunityIcons name="truck" size={24} color={!isEnabled?'white':'gray'}  />
          <Text style={{color:!isEnabled?'white':'#212a42',marginLeft:8 , fontSize:10}}>a domicilio</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={()=> toggleRecibir()}
      >
        <View style={[styles.buttonSwitch,{backgroundColor:isEnabled?'#ff5e00':'#f5f5f5'}]}>
        <FontAwesome5 name="store-alt" size={15} color={isEnabled?'white':'gray'} />
          <Text style={{color:isEnabled?'white':'#212a42',marginLeft:8 , fontSize:10}}>en sucursal</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </View>
  )
}

const Pago = ({togglePago , isEnabled}) =>{
  return (
    <View style={styles.switchRow}>
    <View style={styles.textSwitchContainer}>
    <Text style={{color:'#212a42' , fontWeight:'bold'}} >Deseas pagarlo...</Text>
    </View>
    <View style={styles.switchContainer}>
    <TouchableWithoutFeedback
        onPress={()=> togglePago()}
      >
        <View style={[styles.buttonSwitch,{backgroundColor:!isEnabled?'#ff5e00':'#f5f5f5'}]}>
        <MaterialCommunityIcons name="cash-usd" size={32} color={!isEnabled?'white':'gray'} />
          <Text style={{color:!isEnabled?'white':'#212a42',marginLeft:3 , fontSize:10}}>en efectivo</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={()=> togglePago()}
      >
        <View style={[styles.buttonSwitch,{backgroundColor:isEnabled?'#ff5e00':'#f5f5f5'}]}>
        <Foundation name="credit-card" size={26} color={isEnabled?'white':'gray'} />
          <Text style={{color:isEnabled?'white':'#212a42',marginLeft:8 , fontSize:10}}>con tarjeta</Text>
        </View>
      </TouchableWithoutFeedback>
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
        <Text style={[{fontSize:12, color:'#ff5e00' , fontWeight:'bold'}]}>{item.cantidad} x {item.producto.precio}</Text>
      </View>
    </View>
  </View>
  )
}

const Pedido = ({navigation , route , user , direccion}) => {
  const pedido = route.params.pedido;
  const subtotoal = route.params.subtotal;
  const comercio = route.params.comercio;
  const [aclaraciones,setAclaraciones] = useState('');
  const [recibir, setRecibir] = useState(false);
  const [pago, setPago] = useState(false);

  const togglePago = () =>{
    setPago(!pago);
  }

  const toggleRecibir = () =>{
    setRecibir(!recibir);
  }

  const sendWhatsApp = () =>{
    let urlMap = 'https://www.google.com/maps/search/';
    urlMap+='?api=1%26query='+direccion.lat+','+direccion.long;
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
      <View style={styles.containerCards}>
          <ScrollView>
            {pedido ? (
              pedido.map(item =>
                <Card key={item.producto.id} item={item} />
              )
            ):(null)}
          </ScrollView>
        </View>
        <View style={styles.bottomBar}>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
          <Text style={{fontWeight:'bold' , color:'#212a42'}}>Subtotal:${subtotoal} </Text>
        </View>
        <TextInput
            placeholderTextColor="gray"
            placeholder="Agregar alguna aclaracion"
            style={styles.aclaracionInput}
            value={aclaraciones}
            onChangeText={(text)=> setAclaraciones(text)}
            />
          <Recibir toggleRecibir={toggleRecibir} isEnabled={recibir}/>
          <Pago togglePago={togglePago} isEnabled={pago}/>
          
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableWithoutFeedback onPress={() => sendWhatsApp()}>
            <Image
              style={styles.waIcon}
              source={require('../../assets/waIcon.png')}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.waText}>Enviar pedido por Whatsapp</Text>
        </View>
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