import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { CircularProgress, Backdrop } from "@mui/material"

import { checkAuthOnLoad, loadUserData } from "./store"

import NavBar from "./components/UI/NavBar/NavBar"

import Home from "./pages/Home/Home"
import UserSettings from "./pages/UserSettings/UserSettings"
import Cart from "./pages/Cart/Cart"

function App() {
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.general.isLoading)
  const userUid = useSelector((state) => state.user.uid)

  useEffect(() => {
    dispatch(checkAuthOnLoad())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadUserData())
  }, [dispatch, userUid])

  return (
    <div>
      <NavBar />

      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
