/**
 * Reducer - a function tha ttakes a current state value and action object describing "what happened"
 * returns a new state value
 * (state, action) => newState
 */

const SEARCH_ACTION_TYPES = {
  SET_RESULTS: "search/SET_RESULTS",
  SET_TERM: "search/SEARCH_TERM",
}

export function searchReducer(
  state = { searchTerm: "", searchResults: [] },
  action
) {
  switch (action.type) {
    case SEARCH_ACTION_TYPES.SET_TERM:
      return { ...state, searchTerm: action.payload }

    case SEARCH_ACTION_TYPES.SET_RESULTS:
      return { ...state, searchResults: action.payload }

    default:
      return state
  }
}
