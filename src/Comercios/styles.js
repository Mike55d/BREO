import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection:'row',
    flex:1,
    padding:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8,
    backgroundColor:'white',
    margin:10,
    elevation:3
  },
  imageContainer:{
    flex:1.2,

  },
  cardImage:{
    resizeMode:'contain',
    height:'100%',
  },
  textContainer:{
    flex:3.5,
    flexDirection:'column',
    backgroundColor:'white',
    paddingBottom:10
  },
  textRow:{
    flex:1,
    paddingLeft:10,
    justifyContent:"center",
  },
  nombreComercio:{
    fontSize:18,
    fontWeight:'bold',
    color:'#212A42',
  },
  containerIconText:{
    flex:0.2,
    flexDirection:'row',
    alignItems:"center",
    paddingLeft:10,
  },
  textIcon:{
    flex:1,
    marginRight:10,
    fontSize:10,
    marginLeft:5,
    color:'#212A42',
  }

});

export default styles;