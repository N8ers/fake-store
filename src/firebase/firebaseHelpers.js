import {
  getFirestore,
  doc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  addDoc,
  arrayUnion,
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

export const auth = getAuth()
export const db = getFirestore()

////////////////////
// SEED DB HELPER //
////////////////////

export const seedDB = () => {
  addCollectionAndDocuments("categories", SHOP_DATA)
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log("done")
}

//////////////////
// AUTH HELPERS //
//////////////////

export const logUserOutGoogle = async () => {
  await auth.signOut()
  return true
}

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

////////////////
// DB Helpers //
////////////////

export const getFirebaseData = async () => {
  const collectionRef = collection(db, "categories")
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

export const getUserCart = async (cartDocumentId) => {
  const cartDocRef = doc(db, "carts", cartDocumentId)
  const cartSnapshot = await getDoc(cartDocRef)

  return cartSnapshot.data()
}

export const getUserData = async (uid) => {
  const userDocRef = doc(db, "users", uid)
  const userSnapshot = await getDoc(userDocRef)

  return userSnapshot.data()
}

export const removeItemFromCart = async (name, cartDocumentId) => {
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

export const clearCart = async (cartDocumentId) => {
  const cartDocRef = doc(db, "carts", cartDocumentId)
  await updateDoc(cartDocRef, {
    items: [],
  })
}

export const addItemToCart = async (payload, cartDocumentId) => {
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
  // dispatch({ type: "user/SET_USER", payload: {displayName, email, uid} })

  return { displayName, email, uid }
}
