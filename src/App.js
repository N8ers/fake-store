import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { CircularProgress, Backdrop, Toolbar } from "@mui/material"

import { checkAuthOnLoad, loadUserData, fetchTheData } from "./store"

import NavBar from "./components/UI/NavBar/NavBar"

import PrivateRoutes from "./PrivateRoutes"

import Home from "./pages/Home/Home"
import UserSettings from "./pages/UserSettings/UserSettings"
import Cart from "./pages/Cart/Cart"
import Search from "./pages/Search/Search"

import styles from "./App.module.css"

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/search" && location.search) {
      console.log("fire useEffect")
      /**
       * Sample URL Schema
       * `search?q=roo&price=asc&price-range=[100,250]&categories=[hard,baked-good]`
       * `q` will always be the searched term
       */

      const parsedUrl = location.search.slice(1)
      const queryParams = parsedUrl.split("&")
      const params = {}

      queryParams.forEach((param) => {
        const [key, value] = param.split("=")
        params[key] = value
      })

      const searchTerm = params.q
      /**
       * We will need to make this more robuse in the future for filtering.
       * For now we just hard code the `q=value`
       */

      dispatch({ type: "search/SEARCH_TERM", payload: searchTerm })
    }
  })

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

        <Route element={<PrivateRoutes />}>
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
