import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topBar:{
    borderBottomColor:'#e4e3e3',
    borderBottomWidth:2,
    padding:8
  },
  listContent:{
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
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
  },
  containerImage:{
    backgroundColor:'gray',
    height:75,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:12,
    elevation:10,
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
  }
  
});

export default styles;

