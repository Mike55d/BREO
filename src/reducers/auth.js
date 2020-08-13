const auth = (state = null , action ) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.payload
    case 'LOGIN_FAILURE':
      return null
    case 'LOGOUT':
      return null
    case 'FAKE_AUTH':
      return {
        email:'mike.gonzalez55d@gmail.com',
        firstName:'Heath',
        lastName:'cliff'
      }
    default:
      return state;
  }
}

export default auth;