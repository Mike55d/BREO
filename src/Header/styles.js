import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header:{
    backgroundColor:'white',
    height:50,
    flexDirection:"row",
  },
  containerInput:{
    alignItems:"center",
    justifyContent:"center",
    flex:4,
  },
  containerSearch:{
    flexDirection:"row",
    backgroundColor:'#f5f5f5',
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:15,
    paddingRight:10,
    borderRadius:20
  },
  inputSearch:{
    width:180,
    height:38,
  },
  searchIcon:{
    resizeMode:"contain",
    height:25,
    width:25,
    opacity:0.4
  },
  menuIcon:{
    resizeMode:"contain",
    height:25,
    width:25,
  },
  backIcon:{
    resizeMode:"contain",
    height:20,
    width:20,
  },
  rightContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  leftContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  textHeader:{
    fontWeight:"bold",
    color:'#212A42',
    fontSize:16
  }
});

export default styles;

