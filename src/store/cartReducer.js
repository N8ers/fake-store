const CART_ACTION_TYPES = {
  SET_CART: "cart/SET_CART",
}

const initialCartState = {
  cartTotal: 0,
  items: [
    // id, quantity, name, description, price
  ],
}

export function cartReducer(state = initialCartState, action) {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART:
      const calculateCartTotal = 0
      return { ...state, cartTotal: calculateCartTotal, items: payload.items }

    default:
      return state
  }
}
