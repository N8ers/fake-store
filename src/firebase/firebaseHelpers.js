import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app"

import { firebaseConfig } from "./firebaseConfig"
import { SHOP_DATA } from "./shop-data-seed"

initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

/**
 * TODO
 * Move actions into their own file
 * Move thunks into their own file
 * Refactor Firebasehelpers
 * Rename Actions/Thunks/Firebase Helpers (for consistancey, and because some names are bad)
 */

export const auth = getAuth()
export const db = getFirestore()

////////////////////
// SEED DB HELPER //
////////////////////

export const seed_db = async () => {
  const itemsDocRef = doc(db, "products", "productsDoc")
  await updateDoc(itemsDocRef, {
    items: SHOP_DATA,
  })
}

//////////////////
// AUTH HELPERS //
//////////////////

export const log_user_out = async () => await auth.signOut()

export const sign_user_in = () => signInWithPopup(auth, provider)

////////////////
// DB Helpers //
////////////////

export const get_products = async () => {
  const productsDocRef = doc(db, "products", "productsDoc")
  const productsSnapshot = await getDoc(productsDocRef)
  const data = productsSnapshot.data()
  const items = data.items

  return items
}

export const get_cart = async (cartDocumentId) => {
  const cartDocRef = doc(db, "carts", cartDocumentId)
  const cartSnapshot = await getDoc(cartDocRef)

  return cartSnapshot.data()
}

export const get_user = async (user) => {
  const userDocRef = doc(db, "users", user.uid)
  let userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    await initialize_user(user)
    userSnapshot = await getDoc(userDocRef)
  }

  const snapshotData = userSnapshot.data()

  const data = {
    ...snapshotData,
    uid: user.uid,
  }

  return data
}

export const initialize_user = async ({ displayName, email, uid }) => {
  // Create User
  const createdAt = new Date()
  await setDoc(doc(db, "users", uid), {
    displayName,
    email,
    createdAt,
    cartDocumentId: null,
  })

  // Create Cart
  const cartDocRef = await addDoc(collection(db, "carts"), {
    userUid: uid,
    items: [],
  })

  // Set user.cartDocumentId
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, {
    cartDocumentId: cartDocRef._key.path.segments[1],
  })
}

export const delete_cart_item = async (name, cartDocumentId) => {
  const cartDocRef = doc(db, "carts", cartDocumentId)
  const currentCartSnapshot = await getDoc(cartDocRef)
  const currentCartData = currentCartSnapshot.data()

  const updatedData = currentCartData.items.filter((item) => item.name !== name)

  await updateDoc(cartDocRef, {
    items: updatedData,
  })

  const updatedCartSnapshot = await getDoc(cartDocRef)
  return updatedCartSnapshot.data()
}

export const set_cart_empty = async (cartDocumentId) => {
  const cartDocRef = doc(db, "carts", cartDocumentId)
  await updateDoc(cartDocRef, {
    items: [],
  })
}

export const update_cart_item = async (name, quantity, cartDocumentId) => {
  const cartDocRef = doc(db, "carts", cartDocumentId)
  const currentCartSnapshot = await getDoc(cartDocRef)
  const currentCartData = currentCartSnapshot.data()

  let dataToUpdate = currentCartData.items.map((item) => {
    if (item.name === name) {
      item.quantity = quantity
    }
    return item
  })

  await updateDoc(cartDocRef, {
    items: dataToUpdate,
  })

  const updatedCartSnapshot = await getDoc(cartDocRef)
  return updatedCartSnapshot.data()
}

export const create_cart_item = async (payload, cartDocumentId) => {
  // get existing data
  const cartDocRef = doc(db, "carts", cartDocumentId)
  const currentCartSnapshot = await getDoc(cartDocRef)
  const currentCartData = currentCartSnapshot.data()

  // update item if it exists
  let added = false
  let dataToUpdate = currentCartData.items.map((item) => {
    if (item.name === payload.name) {
      added = true
      item.quantity = payload.quantity
    }
    return item
  })

  // if item doesn't exist
  if (!added) {
    dataToUpdate = [payload, ...dataToUpdate]
  }

  await updateDoc(cartDocRef, {
    items: dataToUpdate,
  })

  const updatedCartSnapshot = await getDoc(cartDocRef)
  return updatedCartSnapshot.data()
}

/**
 * This could use a big ole refactore
 * ATM this gets or creates a user in the "users" collection
 * returns { displayName, email, uid }
 *
 * we should, add a separate 'create_user' helper
 * we should, wrap this in a thunk, and set the store from the thunk
 *    not in the component, as we do now
 */
export const createUserDocumentFromAuth = async (userAuth) => {
  // GET if user exists or CREATE and GET user
  const userDocRef = doc(db, "users", userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    // create user in db
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        cartDocumentId: null,
      })
    } catch (error) {
      console.log("error creating user: ", error)
    }

    // CREATE CART
    const docData = {
      userUid: userAuth.uid,
      items: [
        // itemId
        // itemQuantity
      ],
    }

    let newCart

    try {
      newCart = await addDoc(collection(db, "carts"), docData)
    } catch (error) {
      console.log("error creating cart: ", error)
    }

    // ADD CART ID TO USER
    try {
      await updateDoc(userDocRef, {
        cartDocumentId: newCart._key.path.segments[1],
      })
    } catch (error) {
      console.log("error creating user: ", error)
    }
  }

  const { displayName, email, uid } = userAuth

  return { displayName, email, uid }
}
