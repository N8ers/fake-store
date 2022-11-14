import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import { getFirebaseData } from "../firebase/firebaseHelpers"
import { searchReducer } from "./search.reducer"
import { userReducer } from "./user.reducer"

// Thunk Action Creator = create a function that gives access to state and allow you dispatch new actions
export const fetchTheData = () => async (dispatch, getState) => {
  const result = await getFirebaseData()
  dispatch({ type: "search/SET_RESULTS", payload: result })
}

function rootReducer(state = {}, action) {
  return {
    search: searchReducer(state.search, action),
    user: userReducer(state.user, action),
  }
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
