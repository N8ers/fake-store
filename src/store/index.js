import { createStore } from "redux"

/**
 * Reducer - a function tha ttakes a current state value and action object describing "what happened"
 * returns a new state value
 * (state, action) => newState
 */
function searchReducer(state = { searchTerm: "" }, action) {
  switch (action.type) {
    case "SEARCH/SEARCH_TERM":
      return { searchTerm: action.payload }

    default:
      return state
  }
}

const store = createStore(searchReducer)

export default store
