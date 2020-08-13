const direccion = (state = null , action) =>{
  switch (action.type) {
    case 'SET_ADDRESS':
      return action.payload
    default:
      return state;
  }
}

export default direccion;