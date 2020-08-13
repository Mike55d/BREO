import React,{useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image
} from 'react-native';
import styles from './styles';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import {connect} from 'react-redux';
import {getRubros} from '../actions/rubros';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {routeImages} from '../actions/routePanel';

const Card = ({item , onPress}) => (
  <View style={styles.card}>
    <TouchableWithoutFeedback
      key={item.id}
      onPress={()=> onPress(item.id)}
      style={{ width: '25%' }}
    >
      <View style={styles.containerImage}>
        <Image style={styles.imageRubro} source={{ uri: routeImages + item.Imagen }} />
      </View>
      <Text numberOfLines={1} style={styles.textRubro} >{item.Nombre}</Text>
    </TouchableWithoutFeedback>
  </View>
)



const Home = ({navigation,dispatch,rubros}) =>{

  const onSearch = (palabras) =>{
    navigation.navigate('Comercios',{palabras:palabras,rubro:null});
  }

  const onPress = (id) =>{
    navigation.navigate('Comercios',{palabras:null,rubro:id});
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => (
    layoutMeasurement.height + contentOffset.y >= contentSize.height -0.1
  )
  useEffect(()=>{
    if(!rubros){
      dispatch(getRubros());
    }
  },[rubros])
  
  return (
    <>
    <Header 
    onSearch={onSearch}
    placeholder="Buscar comercio"
    showSearch={true}
    textHeader="Resultados"
    navigation={navigation}
    back={false}
    />
    <Loader/>
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          console.log('bottom');
        }
      }}
    >
    {/* TOP BAR  */}
    <View style={styles.topBar}>
      <Text>Domicilio: <Text style={{fontWeight:'bold'}}>San Jeronimo 3167. Santa Fe</Text></Text>
    </View>
    <View style={styles.listContent}>
      {rubros ? (
        rubros.map(item =>
          <Card key={item.id} item={item} onPress={onPress}/>
        )
      ):(null)}
    </View>
    </ScrollView>
    </>
  )
}

const mapStateToProps = (state) =>({
  rubros:state.rubros
})

export default connect(mapStateToProps)(Home);