const rubros = (state = null, action) =>{
  switch (action.type) {
    case 'SET_RUBROS':
      return action.payload
    default:
      return state;
  }

}

export default rubros;