const USER_ACTION_TYPES = {
  SET_USER: "user/SET_USER",
  CLEAR_USER: "user/CLEAR_USER",
}

const initialUserState = {
  isLoggedIn: false,
  displayName: "",
  cartDocumentId: "",
  firstName: "",
  email: "",
  uid: "",
}

export function userReducer(state = initialUserState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_USER:
      // WE SHOULDNT be modifying state in the reducer
      // Payload should already be in the right shape
      const firstName = payload.displayName.split(" ")[0]
      return { ...state, isLoggedIn: true, firstName, ...payload }
    case USER_ACTION_TYPES.CLEAR_USER:
      return { ...initialUserState }

    default:
      return state
  }
}
