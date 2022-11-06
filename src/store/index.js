import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

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

// Thunk Action Creator = create a function that gives access to state and allow you dispatch new actions
export const fetchTheData = () => async (dispatch, getState) => {
  const gotData = [{ name: "butterscotch" }, { name: "peppermint" }]
  dispatch({ type: "search/SET_RESULTS", payload: gotData })
}

const store = createStore(
  searchReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
