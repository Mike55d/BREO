import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image
} from 'react-native';
import styles from './styles';
import Header from '../Header/Header';


const Card = ({image}) => (
  <View style={styles.card}>
    <View style={styles.containerImage}>
      <Image style={styles.imageRubro} source={image} />
    </View>
    <Text style={styles.textRubro} >Nombre Rubro</Text>
  </View>
)

const onSearch = (blue) =>{
  console.log('ok');
  console.log(blue);
}

const Home = ({navigation}) =>{

  
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
    <ScrollView>
    {/* TOP BAR  */}
    <View style={styles.topBar}>
      <Text>Domicilio: <Text style={{fontWeight:'bold'}}>San Jeronimo 3167. Santa Fe</Text></Text>
    </View>
    <View style={styles.listContent}>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
      <Card image={require('../../assets/images/chair3.png')}/>
      <Card image={require('../../assets/images/chair4.png')}/>
      <Card image={require('../../assets/images/chair5.png')}/>
      <Card image={require('../../assets/images/chair6.png')}/>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
      <Card image={require('../../assets/images/chair3.png')}/>
      <Card image={require('../../assets/images/chair4.png')}/>
      <Card image={require('../../assets/images/chair5.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
      <Card image={require('../../assets/images/chair3.png')}/>
      <Card image={require('../../assets/images/chair4.png')}/>
      <Card image={require('../../assets/images/chair5.png')}/>
      <Card image={require('../../assets/images/chair6.png')}/>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
      <Card image={require('../../assets/images/chair3.png')}/>
      <Card image={require('../../assets/images/chair4.png')}/>
      <Card image={require('../../assets/images/chair5.png')}/>
      <Card image={require('../../assets/images/chair6.png')}/>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
      <Card image={require('../../assets/images/chair3.png')}/>
      <Card image={require('../../assets/images/chair4.png')}/>
      <Card image={require('../../assets/images/chair5.png')}/>
      <Card image={require('../../assets/images/chair6.png')}/>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
      <Card image={require('../../assets/images/chair5.png')}/>
      <Card image={require('../../assets/images/chair6.png')}/>
      <Card image={require('../../assets/images/chair.png')}/>
      <Card image={require('../../assets/images/chair2.png')}/>
    </View>
    </ScrollView>
    </>
  )
}

export default Home;