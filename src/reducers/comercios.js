const comercios = (state = null, action) =>{
  switch (action.type) {
    case 'SET_COMERCIOS':
      return action.payload
    default:
      return state;
  }

}

export default comercios;