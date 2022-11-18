import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch } from "react-redux"

import { checkAuthOnLoad } from "./store"

import NavBar from "./components/UI/NavBar/NavBar"

import Home from "./pages/Home/Home"
import UserSettings from "./pages/UserSettings/UserSettings"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthOnLoad())
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
