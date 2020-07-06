import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';

import styles from './styles';

const Item = ({text , nagivation , screen}) => {
  return(
    <TouchableWithoutFeedback 
    onPress={() => nagivation.jumpTo(screen)}>
      <View style={styles.itemContainer}>
        <Text style={styles.textItem}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}


const Menu = (props) => {
  return (
    <>
    <StatusBar hidden={true}/>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={[styles.header, { flex: 0.07 }]}>
          <Text style={styles.headerText}>Menu</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Item
            screen='Home'
            text="Inicio"
            nagivation={props.navigation}
          />
          <Item
            screen='MiDireccion'
            text="Mi direccion actual"
            nagivation={props.navigation}
          />
          <Item
            screen='Home'
            text="Contactanos"
            nagivation={props.navigation}
          />
          <Item
            screen='Home'
            text="Terminos y condiciones"
            nagivation={props.navigation}
          />
          <Item
            screen='Home'
            text="Cerrar sesion"
            nagivation={props.navigation}
          />
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    </>
  )
}

export default Menu;