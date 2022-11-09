import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  writeBatch,
  getDoc,
} from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { SHOP_DATA } from "./shop-data-seed"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig)
initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
// export const signOutWithGoogle = () => signOut(auth, provider)

export const db = getFirestore()

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

export const seedDB = () => {
  addCollectionAndDocuments("categories", SHOP_DATA)
}

export const createUserDocumentFromAuth = async (userAuth) => {
  // GET if user exists or CREATE and GET user
  const userDocRef = doc(db, "users", userAuth.uid)
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    // create user in db
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log("error creating user: ", error)
    }
  }
  return userDocRef
}

/**
 * Reducer - a function tha ttakes a current state value and action object describing "what happened"
 * returns a new state value
 * (state, action) => newState
 */
function searchReducer(state = { searchTerm: "", searchResults: [] }, action) {
  switch (action.type) {
    case "search/SEARCH_TERM":
      return { searchTerm: action.payload }

    case "search/SET_RESULTS":
      return { ...state, searchResults: action.payload }

    default:
      return state
  }
}

function userReducer(state = { isLoggedIn: false }, action) {
  return state
}

// Thunk Action Creator = create a function that gives access to state and allow you dispatch new actions
export const fetchTheData = () => async (dispatch, getState) => {
  // const collectionRef = collection(db, "categories")
  // const q = query(collectionRef)
  // const querySnapshot = await getDocs(q)

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data()
  //   acc[title.toLowerCase()] = items
  //   return acc
  // }, {})

  // dispatch({ type: "search/SET_RESULTS", payload: categoryMap })

  dispatch({ type: "search/SET_RESULTS", payload: [] })
}

function rootReducer(state = {}, action) {
  return {
    search: searchReducer(state.search, action),
    user: userReducer(state.user, action),
  }
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
