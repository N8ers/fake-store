/**
 * Reducer - a function tha ttakes a current state value and action object describing "what happened"
 * returns a new state value
 * (state, action) => newState
 */

const SEARCH_ACTION_TYPES = {
  SET_RESULTS: "search/SET_RESULTS",
  SET_TERM: "search/SEARCH_TERM",
}

const initialSearchState = { searchTerm: "", searchResults: [] }

export function searchReducer(state = initialSearchState, action) {
  const { type, payload } = action

  switch (type) {
    case SEARCH_ACTION_TYPES.SET_TERM:
      return { ...state, searchTerm: payload }

    case SEARCH_ACTION_TYPES.SET_RESULTS:
      return { ...state, searchResults: payload }

    default:
      return state
  }
}
