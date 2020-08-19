import React ,{useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  RefreshControl,
} from 'react-native';

import Header from '../Header/Header';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {routeImages} from '../actions/routePanel';
import {getProductos} from '../actions/productos';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const TopBar = ({comercio}) => {
  return (
    <View style={styles.topBarContainer}>
      <Text numberOfLines={1} style={styles.textBold}>{comercio.nombre}<Text style={styles.textSlim}> ({comercio.rubro.nombre})</Text></Text>
      <View style={styles.topbarIcons}>
        <FontAwesome5 name="store-alt" size={12} color="#212A42" />
        <Text numberOfLines={1} style={styles.textIcon}>{comercio.dirLocal}</Text>
      </View>
      <View style={styles.topbarIcons}>
        <MaterialCommunityIcons name="truck" size={13} color="#212A42"  />
        <Text numberOfLines={1} style={styles.textIcon}>{comercio.horario}</Text>
      </View>
      <View style={styles.topbarIcons}>
        <Foundation name="credit-card" size={15} color="#212A42"  />
          <Text numberOfLines={1} style={styles.textIcon}>{comercio.pagoTarjeta}</Text>
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
          source={{ uri: routeImages + item.imagen }}
        />
      </View>
      <View style={styles.textContainer}>
          <Text style={[styles.headerCard, styles.textDark]}>{item.nombre}</Text>
          <Text numberOfLines={3} style={[styles.textContent, styles.textDark]}>{item.descripcion}</Text>
          <Text style={styles.price}>${item.precio}</Text>
      </View>
      <View style={styles.counterContainer}>
        <View style={styles.itemRow}>
          <TouchableWithoutFeedback
            onPress={() => increase()}
          >
            <Ionicons name="md-arrow-dropup" size={24} color="#ff5e00" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.itemRow}>
          <Text style={{ color: '#212a42' , fontWeight:"bold",fontSize:18}}>{count}</Text>
        </View>
        <View style={styles.itemRow}>
          <TouchableWithoutFeedback
            onPress={() => decrease()}
          >
            <Ionicons name="md-arrow-dropdown" size={24} color="#ff5e00" />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
}

const Comercio = ({navigation, dispatch , route , productos , refresh , direccion , loader}) => {
  const comercio = route.params.comercio;
  const [pedido,setPedido] = useState([]);
  const [subtotal,setSubtotal] = useState(0);

  const onSearch = (palabras) =>{
    dispatch(getProductos(comercio.id,palabras));
  }

  const onRefresh = React.useCallback(() => {
    dispatch(getProductos(comercio.id,null,true));
  },[]);

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

  const verPedido = () =>{
    let paramsRoute;
    let view;
    if(direccion.provincia){
      paramsRoute = {pedido:pedido,comercio:comercio,subtotal:subtotal};
      view = 'Pedido';
    }else{
      paramsRoute = {back:'Comercio'};
      view = 'MiDireccion';
    }
    navigation.navigate(view,paramsRoute);
  }

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
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
      contentContainerStyle={{paddingTop:10}}
      >
        {productos && !loader ?(
          productos.map(item =>
            <Card key={item.id} item={item} updatePedido={updatePedido}/>
          )
        ):(null)}
      </ScrollView>
        {subtotal?(
          <View style={styles.subtotalContainer}>
            <Text style={{color:'white'}}>Subtotal del pedido: <Text style={styles.textTotal}>${subtotal}</Text></Text>
            <TouchableWithoutFeedback
              onPress={() => verPedido()}
            >
              <Text style={styles.textTotal}>Ver resumen</Text>
            </TouchableWithoutFeedback>
          </View>
        ):(null)}
        {/* <View style={styles.footerContainer}>
        </View> */}
    </>
  )
}

const mapStateToProps = (state) =>({
  productos:state.productos,
  refresh:state.refresh,
  direccion:state.direccion,
  loader:state.loader,

})

export default connect(mapStateToProps)(Comercio);