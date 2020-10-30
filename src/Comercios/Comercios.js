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
import {connect} from 'react-redux';
import {getComercios} from '../actions/comercios';
import {routeImages} from '../actions/routePanel';

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
          <Text numberOfLines={1} style={styles.nombreComercio,{fontSize:item.nombre.length > 25 ? 12 :18}}>{item.nombre}</Text>
        </View>
        <View style={styles.containerIconText}>
          <Image style={{height:16,width:16,resizeMode:'contain'}} source={require('../../assets/icons/store.png')} />
          <Text numberOfLines={1} style={styles.textIcon}>{item.dirLocal}</Text>
        </View>
        <View style={styles.containerIconText}>
        <Image style={{height:15,width:15,resizeMode:'contain'}} source={require('../../assets/icons/truck.png')} />
          <Text numberOfLines={1} style={styles.textIcon}>{item.horario}</Text>
        </View>
        <View style={styles.containerIconText}>
        <Image style={{height:15,width:15,resizeMode:'contain'}} source={require('../../assets/icons/card.png')} />
          <Text numberOfLines={1} style={styles.textIcon}>{item.pagoTarjeta}</Text>
        </View>
        
      </View>
    </View>
  </TouchableWithoutFeedback>
  )
}


const Comercios = ({navigation , dispatch , route , comercios , refresh , loader}) => {
  const palabras = route.params.palabras;
  const rubro = route.params.rubro;

  const onRefresh = React.useCallback(() => {
    console.log(rubro);
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
    console.log(rubro);
    console.log('change params');
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
        {comercios && !loader ? (
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
	loader:state.loader

})
export default connect(mapStateToProps)(Comercios);