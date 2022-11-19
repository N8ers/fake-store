import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { CircularProgress, Backdrop } from "@mui/material"

import { checkAuthOnLoad } from "./store"

import NavBar from "./components/UI/NavBar/NavBar"

import Home from "./pages/Home/Home"
import UserSettings from "./pages/UserSettings/UserSettings"

function App() {
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.general.isLoading)

  useEffect(() => {
    dispatch(checkAuthOnLoad())
  }, [])

  return (
    <div>
      <NavBar />

      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </div>
  )
}

export default App
