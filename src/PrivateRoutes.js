import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoutes = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
