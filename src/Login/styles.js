import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  column:{
    flex:1,
    flexDirection:'column',
    // backgroundColor:'#f0a500'
  },
  containerLogo:{
    flex:3,
    paddingTop:30,
    alignItems:"center",
    justifyContent:"center"
  },
  containerFooter:{
    paddingTop:35,
    flex:1.5,
    alignItems:"center",
    justifyContent:"flex-start"
  },
  logo:{
    height:250,
    width:250,
    resizeMode:'contain'
  },
  googleButton:{
    width:180,
    padding:10,
    alignItems:"center",
    backgroundColor:'white'
  }

});

export default styles;

