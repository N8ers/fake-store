/**
 * Reducer - a function tha ttakes a current state value and action object describing "what happened"
 * returns a new state value
 * (state, action) => newState
 */

import { SEARCH_ACTION_TYPES } from "./search.types"

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
