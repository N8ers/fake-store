const initUserState = {
  isLoggedIn: false,
  displayName: "",
  firstName: "",
  email: "",
  uid: "",
}

export function userReducer(state = initUserState, action) {
  switch (action.type) {
    case "user/SET_USER":
      const firstName = action.payload.displayName.split(" ")[0]
      return { ...state, isLoggedIn: true, firstName, ...action.payload }
    case "user/CLEAR_USER":
      return { ...initUserState }

    default:
      return false
  }
}
