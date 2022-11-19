const GENERAL_ACTION_TYPES = {
  SET_IS_LOADING: "general/SET_IS_LOADING",
}

const initGeneralState = {
  isLoading: false,
}

export function generalReducer(state = initGeneralState, action) {
  const { type, payload } = action

  switch (type) {
    case GENERAL_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: payload }

    default:
      return state
  }
}
