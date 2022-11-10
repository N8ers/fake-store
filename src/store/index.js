import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import { getFirebaseData } from "../firebaseHelpers"

/**
 * Reducer - a function tha ttakes a current state value and action object describing "what happened"
 * returns a new state value
 * (state, action) => newState
 */
function searchReducer(state = { searchTerm: "", searchResults: [] }, action) {
  switch (action.type) {
    case "search/SEARCH_TERM":
      return { searchTerm: action.payload }

    case "search/SET_RESULTS":
      return { ...state, searchResults: action.payload }

    default:
      return state
  }
}

const initUserState = {
  isLoggedIn: false,
  displayName: "",
  firstName: "",
  email: "",
  uid: "",
}

function userReducer(state = initUserState, action) {
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
