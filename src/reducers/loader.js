const loader = (state = false, action) => {
  switch (action.type) {
    case 'LOADER_ON':
      return true
    case 'LOADER_OFF':
      return false
    default:
      return state;
  }
}

export default loader;