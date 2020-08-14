const refresh = (state = false, action) =>{
  switch (action.type) {
    case 'REFRESH_ON':
      return true;
    case 'REFRESH_OFF':
      return false;
    default:
      return state
  }
}

export default refresh;