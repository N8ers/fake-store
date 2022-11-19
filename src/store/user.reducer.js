const USER_ACTION_TYPES = {
  SET_USER: "user/SET_USER",
  CLEAR_USER: "user/CLEAR_USER",
}

const initUserState = {
  isLoggedIn: false,
  displayName: "",
  firstName: "",
  email: "",
  uid: "",
}

export function userReducer(state = initUserState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_USER:
      const firstName = payload.displayName.split(" ")[0]
      return { ...state, isLoggedIn: true, firstName, ...payload }
    case USER_ACTION_TYPES.CLEAR_USER:
      return { ...initUserState }

    default:
      return state
  }
}
