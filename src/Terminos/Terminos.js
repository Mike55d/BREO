import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
} from 'react-native';
import Header from '../Header/Header';
import Axios from 'axios';
import {routePanel} from '../actions/routePanel';
import {loaderOff,loaderOn} from '../actions/loader';
import {connect} from 'react-redux';
import styles from './styles';


const Terminos = ({navigation, dispatch}) =>{
  const[terminos,setTerminos] = useState(null);

  const getTerminos = () => {
    dispatch(loaderOn());
    Axios.get(routePanel+'users/terminos')
    .then(response=>{
      console.log(response);
      setTerminos(response.data);
      dispatch(loaderOff());
    })
    .catch(error => alert(error));
  }


  useEffect(()=>{
    if(!terminos){
      getTerminos();
    }
  });

  return (
    <>
      <Header
        back={false}
        textHeader="Terminos y condiciones"
        navigation={navigation}
      />
      <View style={styles.container}>
        {terminos?(
          terminos.map(item=>
            <View style={styles.containerText} key={item.id}>
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.content}>{item.contenido}</Text>
            </View>
          )
        ):(null)}
      </View>
    </>
  )
}

export default connect()(Terminos);