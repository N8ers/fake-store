import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { CircularProgress, Backdrop, Toolbar } from "@mui/material"

import { checkAuthOnLoad, loadUserData, fetchTheData } from "./store"

import NavBar from "./components/UI/NavBar/NavBar"

import Home from "./pages/Home/Home"
import UserSettings from "./pages/UserSettings/UserSettings"
import Cart from "./pages/Cart/Cart"
import Search from "./pages/Search/Search"

import styles from "./App.module.css"

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

  useEffect(() => {
    dispatch(fetchTheData())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <NavBar />
      <Toolbar />

      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
