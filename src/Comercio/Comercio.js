import React ,{useState, useEffect} from 'react';
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
import {connect} from 'react-redux';
import {routeImages} from '../actions/routePanel';
import {getProductos} from '../actions/productos';

const TopBar = ({comercio}) => {
  return (
    <View style={styles.topBarContainer}>
      <Text numberOfLines={1} style={styles.textBold}>{comercio.nombre}<Text style={styles.textSlim}>({comercio.rubro.nombre})</Text></Text>
      <View style={styles.topbarIcons}>
        <MaterialCommunityIcons name="truck" size={13} color="#111d5e" style={{ opacity: 0.8 }} />
        <Text numberOfLines={1} style={styles.textIcon}>Horarios de envio {comercio.horario}</Text>
      </View>
      <View style={styles.topbarIcons}>
        <Foundation name="credit-card" size={15} color="#111d5e" style={{ opacity: 0.8 }} />
          <Text numberOfLines={1} style={styles.textIcon}>Formas de pago con tarjeta {comercio.pagoTarjeta}</Text>
      </View>
      <View style={styles.topbarIcons}>
        <Feather name="map-pin" size={12} color="#111d5e" style={{ opacity: 0.8 }} />
        <Text numberOfLines={1} style={styles.textIcon}>{comercio.dirLocal}</Text>
      </View>
    </View>
  )
}

const Card = ({item , updatePedido}) => {
  const [count , setCount] = useState(0);
  const increase = () => {
    updatePedido(item,count + 1);
    setCount(count + 1)
  };
  const decrease = () => {
    if(count > 0){
      updatePedido(item,count - 1);
      setCount(count - 1)
    }
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.cardImage}
          source={{uri:routeImages+item.imagen}}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Text style={[styles.headerCard, styles.textDark]}>{item.nombre}</Text>
  <Text numberOfLines={2} style={[styles.textContent ,styles.textDark]}>{item.descripcion}</Text>
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
          <Text style={{fontSize:12,padding:5 , color:'#111d5e'}}>${item.precio}</Text>
        </View>
      </View>
    </View>
  )
}

const Comercio = ({navigation, dispatch , route , productos}) => {
  const comercio = route.params.comercio;
  const [pedido,setPedido] = useState([]);
  const [subtotal,setSubtotal] = useState(0);

  const onSearch = (palabras) =>{
    dispatch(getProductos(comercio.id,palabras));
  }

  const updatePedido = (item,cantidad) =>{
    let pedidoA = pedido;
    let match = pedidoA.findIndex(itemPedido => itemPedido.producto.id == item.id);
    if(match == -1){
      pedidoA.push({producto:item,cantidad:cantidad});
    }else{
      if(cantidad > 0){
        pedidoA[match].cantidad = cantidad;
      }else{
        pedidoA.splice(match,1);
      }
    }
    setPedido([...pedidoA]);
  }

  useEffect(()=>{
    let subtotalPedido = 0;
    pedido.forEach(item =>{
      console.log(item);
      subtotalPedido+= item.producto.precio * item.cantidad;
    })
    setSubtotal(subtotalPedido);
    console.log(pedido);
  },[pedido])

  useEffect(()=>{
    if(!productos){
      dispatch(getProductos(comercio.id,null));
    }
  },[productos]);

  useEffect(()=>{
      dispatch(getProductos(comercio.id,null));
      setPedido([]);
  },[route.params.comercio]);

  return (
    <>
    <Header
      showSearch={true}
      placeholder="Buscar en el catalogo"
      onSearch={onSearch}
      navigation={navigation}
      back="Comercios"
    />
      <TopBar comercio={comercio}/>
      <ScrollView contentContainerStyle={{paddingTop:10}}>
        {productos ?(
          productos.map(item =>
            <Card key={item.id} item={item} updatePedido={updatePedido}/>
          )
        ):(null)}
      </ScrollView>
        {subtotal?(
          <View style={styles.subtotalContainer}>
            <Text>Subtotal del pedido: <Text style={styles.textTotal}>${subtotal}</Text></Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Pedido',{pedido:pedido,comercio:comercio,subtotal:subtotal})}
            >
              <Text style={styles.textTotal}>Ver resumen</Text>
            </TouchableWithoutFeedback>
          </View>
        ):(null)}
        <View style={styles.footerContainer}>
        </View>
    </>
  )
}

const mapStateToProps = (state) =>({
  productos:state.productos
})

export default connect(mapStateToProps)(Comercio);