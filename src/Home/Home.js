import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import styles from './styles';


const Card = ({image}) => (
  <View style={styles.card}>
    <View style={styles.containerImage}>
      <Image style={styles.imageRubro} source={image} />
    </View>
    <Text style={styles.textRubro} >Nombre Rubro</Text>
  </View>
)

const Home = () =>{
  return (
    <>
    <ScrollView>
      {/* HEADER */}
    <View style={styles.header}>
      <View style={styles.leftContainer}>
      <TouchableWithoutFeedback>
          <Image style={styles.backIcon} source={require('../../assets/images/Asset10.png')} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.containerInput}>
        <View style={styles.containerSearch}>
          <TextInput onSubmitEditing={()=>console.log('submit')} placeholder="Buscar comercio" style={styles.inputSearch}/>
          <TouchableWithoutFeedback
            onPress={()=> console.log('press')}
          >
            <Image style={styles.searchIcon} source={require('../../assets/images/search.png')}/>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableWithoutFeedback>
          <Image style={styles.menuIcon} source={require('../../assets/images/Asset8.png')} />
        </TouchableWithoutFeedback>
      </View>
    </View>
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
    </View>
    </ScrollView>
    </>
  )
}

export default Home;