/**
 * Reducer - a function tha ttakes a current state value and action object describing "what happened"
 * returns a new state value
 * (state, action) => newState
 */
export function searchReducer(
  state = { searchTerm: "", searchResults: [] },
  action
) {
  switch (action.type) {
    case "search/SEARCH_TERM":
      return { ...state, searchTerm: action.payload }

    case "search/SET_RESULTS":
      return { ...state, searchResults: action.payload }

    default:
      return state
  }
}
