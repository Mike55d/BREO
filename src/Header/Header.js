import React ,{useState} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Text
} from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';


const Home = ({onSearch , placeholder , showSearch , textHeader, navigation , back}) =>{
  const [words,setWords] = useState('');

  return (
    <>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {back ? (
            <TouchableWithoutFeedback>
            <Ionicons name="md-arrow-round-back" size={25} color="#111d5e" />
            </TouchableWithoutFeedback>
          ):(
            null
          )}
        </View>
        <View style={styles.containerInput}>
          {showSearch ? (
            <View style={styles.containerSearch}>
              <TextInput 
              onSubmitEditing={() => onSearch(words)} 
              placeholder={placeholder} style={styles.inputSearch}
              onChangeText={text=>setWords(text)}
              />
              <TouchableWithoutFeedback
                onPress={() => onSearch(words)}
              >
                <Image style={styles.searchIcon} source={require('../../assets/images/search.png')} />
              </TouchableWithoutFeedback>
            </View>
          ) : (
              <>
                <Text style={styles.textHeader}>{textHeader}</Text>
              </>
            )}
        </View>
        <View style={styles.rightContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
            <Entypo name="menu" size={28} color="#111d5e" />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  )
}

export default Home;