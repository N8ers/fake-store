import { onAuthStateChanged } from "firebase/auth"

import {
  auth,
  get_products,
  get_cart,
  get_user,
  create_cart_item,
  set_cart_empty,
  delete_cart_item,
  update_cart_item,
} from "../firebase/firebaseHelpers"

// getProducts
export const fetchTheData = () => async (dispatch) => {
  const result = await get_products()
  dispatch({ type: "search/SET_RESULTS", payload: result })
}

export const checkAuthOnLoad = () => async (dispatch) => {
  dispatch({ type: "general/SET_IS_LOADING", payload: true })
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const payload = {
        isLoggedIn: true,
        displayName: "",
        cartDocumentId: "",
        firstName: "",
        email: "",
        uid: user.uid,
      }

      dispatch({ type: "user/SET_USER", payload })
    }

    dispatch({ type: "general/SET_IS_LOADING", payload: false })

    return user
  })
}

// getUser
export const loadUserData = () => async (dispatch, getState) => {
  dispatch({ type: "general/SET_IS_LOADING", payload: true })

  const state = getState()

  const userUid = state.user.uid
  if (userUid) {
    const userData = await get_user(state.user.uid)
    const { displayName, email, cartDocumentId } = userData
    const userPayload = {
      isLoggedIn: true,
      displayName,
      cartDocumentId,
      firstName: displayName.split(" ")[0],
      email,
      uid: userUid,
    }
    dispatch({ type: "user/SET_USER", payload: userPayload })

    const cartData = await get_cart(userData.cartDocumentId)
    const cartTotal = cartData.items.reduce(
      (accumulator, cartItem) =>
        accumulator + cartItem.quantity * cartItem.price,
      0
    )
    const cartPayload = {
      cartTotal,
      items: cartData.items,
    }
    dispatch({ type: "cart/SET_CART", payload: cartPayload })
  }

  dispatch({ type: "general/SET_IS_LOADING", payload: false })
}

export const addToCart = (payload) => async (dispatch, getState) => {
  dispatch({ type: "general/SET_IS_LOADING", payload: true })

  const state = getState()
  const updatedData = await create_cart_item(payload, state.user.cartDocumentId)

  const cartTotal = updatedData.items.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity * cartItem.price,
    0
  )
  const cartPayload = {
    cartTotal,
    items: updatedData.items,
  }
  dispatch({ type: "cart/SET_CART", payload: cartPayload })

  dispatch({ type: "general/SET_IS_LOADING", payload: false })
}

export const checkout = () => async (dispatch, getState) => {
  dispatch({ type: "general/SET_IS_LOADING", payload: true })

  const state = getState()
  const cartDocumentId = state.user.cartDocumentId

  await set_cart_empty(cartDocumentId)

  const cartPayload = {
    cartTotal: 0,
    items: [],
  }
  dispatch({ type: "cart/SET_CART", payload: cartPayload })

  dispatch({ type: "general/SET_IS_LOADING", payload: false })
}

// removeItemFromCart
export const removeItemFromCartThunk = (name) => async (dispatch, getState) => {
  dispatch({ type: "general/SET_IS_LOADING", payload: true })

  const state = getState()
  const cartDocumentId = state.user.cartDocumentId
  const updatedData = await delete_cart_item(name, cartDocumentId)

  const cartTotal = updatedData.items.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity * cartItem.price,
    0
  )
  const cartPayload = {
    cartTotal,
    items: updatedData.items,
  }
  dispatch({ type: "cart/SET_CART", payload: cartPayload })

  dispatch({ type: "general/SET_IS_LOADING", payload: false })
}

// updateCartQuantity
export const updateCartQuantityThunk =
  (name, quantity) => async (dispatch, getState) => {
    dispatch({ type: "general/SET_IS_LOADING", payload: true })

    const state = getState()
    const cartDocumentId = state.user.cartDocumentId

    const updatedCart = await update_cart_item(name, quantity, cartDocumentId)

    const cartTotal = updatedCart.items.reduce(
      (accumulator, cartItem) =>
        accumulator + cartItem.quantity * cartItem.price,
      0
    )
    const cartPayload = {
      cartTotal,
      items: updatedCart.items,
    }

    dispatch({ type: "cart/SET_CART", payload: cartPayload })

    dispatch({ type: "general/SET_IS_LOADING", payload: false })
  }
