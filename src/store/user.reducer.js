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
      return { ...state, ...payload }
    case USER_ACTION_TYPES.CLEAR_USER:
      return { ...initialUserState }

    default:
      return state
  }
}
