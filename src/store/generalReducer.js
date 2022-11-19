const GENERAL_ACTION_TYPES = {
  SET_IS_LOADING: "general/SET_IS_LOADING",
}

const initialGeneralState = {
  isLoading: false,
}

export function generalReducer(state = initialGeneralState, action) {
  const { type, payload } = action

  switch (type) {
    case GENERAL_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: payload }

    default:
      return state
  }
}
