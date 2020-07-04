const auth = (state = {user:null} , action ) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        token: '1263hdytsjakiqolwmen'
      }
    case 'LOGIN_FAILURE':
      return {
        user: null,
        error: action.payload
      }
    case 'LOGOUT':
      return {user:null}
    default:
      return state;
  }
}

export default auth;