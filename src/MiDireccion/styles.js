import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  formInput:{
    marginTop:15,
    paddingLeft:10,
    borderColor:'gray',
    borderWidth:1,
    borderRadius:20,
    backgroundColor:'white'
  },
  textHead:{
    margin:8,
    fontWeight:"bold"
  },
  formContainer:{
    paddingLeft:15,
    paddingRight:15,
  },
  button:{
    marginTop:15,
    borderColor:'gray',
    borderWidth:1,
    padding:10,
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'white'

  },
  textActualizar:{
    fontWeight:"bold",
    textDecorationLine:"underline",
    color:'#212a42'
  },
  buttonActualizar:{
    marginTop:10,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default styles;