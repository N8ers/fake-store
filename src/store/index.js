import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { onAuthStateChanged } from "firebase/auth"

import {
  getFirebaseData,
  getUserCart,
  getUserData,
  addItemToCart,
  clearCart,
} from "../firebase/firebaseHelpers"
import { auth } from "../firebase/firebaseHelpers"
import { rootReducer } from "./rootReducer"

// Thunk Action Creator = create a function that gives access to state and allow you dispatch new actions
export const fetchTheData = () => async (dispatch, getState) => {
  const result = await getFirebaseData()
  dispatch({ type: "search/SET_RESULTS", payload: result })
}

export const checkAuthOnLoad = () => async (dispatch, getState) => {
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

export const loadUserData = () => async (dispatch, getState) => {
  dispatch({ type: "general/SET_IS_LOADING", payload: true })

  const state = getState()

  const userUid = state.user.uid
  if (userUid) {
    const userData = await getUserData(state.user.uid)
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

    const cartData = await getUserCart(userData.cartDocumentId)
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
  const updatedData = await addItemToCart(payload, state.user.cartDocumentId)

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

  await clearCart(cartDocumentId)

  const cartPayload = {
    cartTotal: 0,
    items: [],
  }
  dispatch({ type: "cart/SET_CART", payload: cartPayload })

  dispatch({ type: "general/SET_IS_LOADING", payload: false })
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
