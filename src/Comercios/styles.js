import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection:'row',
    flex:1,
    padding:15,
    paddingBottom:8,
    alignItems:'center',
    justifyContent:'center',
  },
  imageContainer:{
    flex:1.2,
    zIndex:1,
    height:95,
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
    flexDirection:'column',
    backgroundColor:'#f5f5f5',
    height:85,
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
    flex:1,
    marginTop:5,
    paddingLeft:15,
    justifyContent:"center",
  },
  nombreComercio:{
    fontSize:16,
    fontWeight:'bold',
    color:'#212A42'
  },
  // iconsRow:{
  //   flex:1,
  //   padding:1,
  //   paddingBottom:5,
  //   flexDirection:"column",
  //   alignItems:"center",
  //   justifyContent:"space-between",
  // },
  containerIconText:{
    flex:0.7,
    flexDirection:'row',
    alignItems:"center",
    paddingLeft:15,
    paddingBottom:5,
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