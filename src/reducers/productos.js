const productos = (state = null, action) =>{
  switch (action.type) {
    case 'SET_PRODUCTOS':
      return action.payload
    default:
      return state;
  }
}

export default productos;