import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { onAuthStateChanged } from "firebase/auth"

import { getFirebaseData } from "../firebase/firebaseHelpers"
import { auth } from "../firebase/firebaseHelpers"
import { rootReducer } from "./rootReducer"

// Thunk Action Creator = create a function that gives access to state and allow you dispatch new actions
export const fetchTheData = () => async (dispatch, getState) => {
  const result = await getFirebaseData()
  dispatch({ type: "search/SET_RESULTS", payload: result })
}

export const checkAuthOnLoad = () => async (dispatch, getState) => {
  dispatch({ type: "general/SET_IS_LOADING", payload: true })
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const payload = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      }
      dispatch({ type: "user/SET_USER", payload })
    }
    dispatch({ type: "general/SET_IS_LOADING", payload: false })
    return user
  })
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
