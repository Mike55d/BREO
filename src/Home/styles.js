import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topBar:{
    backgroundColor:'#006DFF',
    borderBottomColor:'#e4e3e3',
    borderBottomWidth:2,
    padding:8
  },
  listContent:{
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
    backgroundColor:"#f5f5f5"
  },
  card:{
    height:100,
    width:'25%',
    alignItems:"center",
    justifyContent:"center",
  },
  imageRubro:{
    resizeMode:'contain',
    width:73,
    height:63,
  },
  textRubro:{
    fontSize:10,
    color:'#212A42'
  },
  containerImage:{
    backgroundColor:'white',
    height:75,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:12,
    elevation:1
  },
  footer:{
    height:65,
    padding:25,
    flexDirection:"row",
    alignItems:'center'
  },
  textFooter:{
    flex:1,
    fontWeight:"bold",
    color:'#212A42'
  },
  waIcon:{
    resizeMode:'contain',
    height:70,
    width:70,
  },
  
});

export default styles;

