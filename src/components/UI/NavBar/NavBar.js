import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  AppBar,
  Box,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  InputBase,
  Divider,
  Menu,
  Button,
  Grid,
} from "@mui/material"

import {
  AccountCircle,
  ShoppingCartCheckout,
  Search,
  Forest,
} from "@mui/icons-material"

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  logUserOutGoogle,
  seedDB,
} from "../../../firebase/firebaseHelpers"

function NavBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const firstName = useSelector((state) => state.user.firstName)

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch({ type: "search/SEARCH_TERM", payload: search })
  }

  const [search, setSearch] = useState("")

  // MENU
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    const result = await createUserDocumentFromAuth(user)
    const payload = {
      displayName: result.displayName,
      email: result.email,
      uid: result.uid,
    }
    dispatch({ type: "user/SET_USER", payload: payload })
  }

  const logUserOut = async () => {
    await logUserOutGoogle()
    handleClose()
    dispatch({ type: "user/CLEAR_USER" })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, mt: "10px" }}
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                Fake Shop
              </Typography>
            </Grid>

            <Grid item xs={4} align="center">
              <Paper
                component="form"
                onSubmit={handleSearch}
                sx={{
                  m: "4px",
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search The Real Fake Store!"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: "10px" }} type="submit">
                  <Search />
                </IconButton>
              </Paper>
            </Grid>

            <Grid item xs={4} align="right">
              {isLoggedIn ? (
                <>
                  <span>Hi, {firstName}</span>
                  <Button size="large" color="inherit" onClick={seedDB}>
                    <Forest />
                    Seed DB
                  </Button>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={() => navigate("/cart")}
                  >
                    <ShoppingCartCheckout />
                  </IconButton>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleClick}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>My orders</MenuItem>
                    <MenuItem onClick={handleClose}>Wishlist</MenuItem>
                    <Divider />
                    <MenuItem onClick={logUserOut}>Logout</MenuItem>
                  </Menu>{" "}
                </>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 1 }}
                  onClick={logGoogleUser}
                >
                  Log In
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
