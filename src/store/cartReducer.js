const CART_ACTION_TYPES = {
  SET_CART: "cart/SET_CART",
}

const initialCartState = {
  cartTotal: 0,
  items: [],
}

export function cartReducer(state = initialCartState, action) {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART:
      return { ...state, ...payload }

    default:
      return state
  }
}
