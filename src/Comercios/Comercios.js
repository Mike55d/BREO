import React,{useEffect} from 'react';
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
import {connect} from 'react-redux';
import {getComercios} from '../actions/comercios';
import {routeImages} from '../actions/routePanel';
import { FontAwesome5 } from '@expo/vector-icons';

const Card = ({item , onPress}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(item)}
    >
      <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.cardImage}
          source={{uri:routeImages+item.imagen}}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Text style={styles.nombreComercio}>{item.nombre}</Text>
        </View>
        <View style={styles.containerIconText}>
        <MaterialCommunityIcons name="truck" size={14} color="#ff5e00" />
          <Text numberOfLines={1} style={styles.textIcon}>{item.horario}</Text>
        </View>
        <View style={styles.containerIconText}>
        <Foundation name="credit-card" size={16} color="#ff5e00" />
          <Text numberOfLines={1} style={styles.textIcon}>{item.pagoTarjeta}</Text>
        </View>
        <View style={styles.containerIconText}>
          <FontAwesome5 name="store-alt" size={12} color="#ff5e00" />
          <Text numberOfLines={1} style={styles.textIcon}>{item.dirLocal}</Text>
        </View>
        {/* <View style={styles.iconsRow}>
          <MaterialCommunityIcons name="truck" size={13} color="black" style={{opacity:0.8}} />
          <Foundation name="credit-card" size={15} color="black" style={{opacity:0.8}} />
          <Feather name="map-pin" size={12} color="black" style={{opacity:0.8}} />
        </View> */}
      </View>
    </View>
  </TouchableWithoutFeedback>
  )
}


const Comercios = ({navigation , dispatch , route , comercios , refresh}) => {
  const palabras = route.params.palabras;
  const rubro = route.params.rubro;

  const onRefresh = React.useCallback(() => {
    dispatch(getComercios('rubro',rubro,true));
  },[comercios]);
  
  useEffect(()=> {
    if(!comercios){
      if(palabras){
        dispatch(getComercios('palabras',palabras));
      }else{
        dispatch(getComercios('rubro',rubro));
      }
    }
  },[comercios]);

  useEffect(()=> {
    console.log('change params')
      if(palabras){
        dispatch(getComercios('palabras',palabras));
      }else{
        dispatch(getComercios('rubro',rubro));
      }
  },[route.params.palabras,route.params.rubro]);


  const onPressComercio = (item) =>{
    navigation.navigate('Comercio',{comercio:item});
  }

  return (
    <>
      <Header 
        showSearch={false}
        textHeader="Resultados"
        navigation={navigation}
        back="Home"
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {comercios ? (
          comercios.map(item =>
              <Card onPress={onPressComercio} key={item.id} item={item}/>
            )
        ):(null)}
      </ScrollView>
    </>
  )
}
const mapStateToProps = (state) =>({
  comercios:state.comercios,
  refresh:state.refresh,

})
export default connect(mapStateToProps)(Comercios);