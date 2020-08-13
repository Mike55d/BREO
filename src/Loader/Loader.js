import React from 'react';
import {
  View,
  ActivityIndicator,
  Modal,
  Text,
  TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';

const Loader = ({loader})=> (
  <Modal
    animationType="fade"
    transparent={true}
    visible={loader}
  >
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f8b24f"/>
    </View>
  </Modal>
)
const mapStateToProps = (state) => ({
  loader:state.loader
})
export default connect(mapStateToProps)(Loader);