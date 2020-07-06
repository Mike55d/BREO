import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection:'row',
    flex:1,
    padding:15,
    paddingBottom:0,
    alignItems:'center',
    justifyContent:'center',
  },
  imageContainer:{
    flex:1,
    zIndex:1,
    height:80,
    backgroundColor:'#438a5e',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,

    elevation: 15,
  },
  cardImage:{
    resizeMode:'contain',
    height:75,
    width:80,
  },
  textContainer:{
    flex:3.5,
    flexDirection:'row',
    backgroundColor:'#f5f5f5',
    height:60,
    marginLeft:-5,
    borderTopEndRadius:3,
    borderBottomEndRadius:3,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 15,
  },
  textRow:{
    flex:9,
    padding:15,
    justifyContent:"center",
  },
  nombreComercio:{
    fontSize:14,
  },
  iconsRow:{
    flex:1,
    padding:1,
    paddingBottom:5,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between",
  },

});

export default styles;