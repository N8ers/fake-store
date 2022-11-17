import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "./firebase/firebaseHelpers"

import NavBar from "./components/UI/NavBar/NavBar"

import Home from "./pages/Home/Home"
import UserSettings from "./pages/UserSettings/UserSettings"

function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
    })
  }, [])

  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </div>
  )
}

export default App
