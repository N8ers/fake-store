import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  AppBar,
  Box,
  Paper,
  Badge,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  InputBase,
  Divider,
  Menu,
  Button,
  Grid,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"

import {
  AccountCircle,
  ShoppingCartCheckout,
  Search,
  // Forest,
} from "@mui/icons-material"

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  logUserOutGoogle,
  // seedDB,
} from "../../../firebase/firebaseHelpers"

function NavBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const firstName = useSelector((state) => state.user.firstName)
  const itemsInCart = useSelector((state) => state.cart.items.length)
  const searchTerm = useSelector((state) => state.search.searchTerm)

  const [isDesktopView, setIsDesktopView] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  useEffect(() => {
    setIsDesktopView(matches)
  }, [isDesktopView, matches])

  const handleSearch = (e) => {
    e.preventDefault()

    let queryParams = ""
    if (search) {
      queryParams = `?q=${search}`
    }
    navigate("/search" + queryParams)

    // navigate("/search")
    dispatch({ type: "search/SEARCH_TERM", payload: search })
  }

  const [search, setSearch] = useState("")
  useEffect(() => {
    setSearch(searchTerm)
  }, [searchTerm])

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

  const titleSection = (
    <Typography
      variant="h6"
      component="div"
      fontWeight="800"
      sx={{ flexGrow: 1, mt: "10px" }}
      onClick={() => navigate("/")}
      style={{ cursor: "pointer" }}
    >
      Fake Store
    </Typography>
  )

  const searchSection = (
    <>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          m: "4px",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          maxWidth: "600px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="root beer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <Button endIcon={<Search />} type="submit" sx={{ color: "#7a85c1" }}>
          Search
        </Button>
      </Paper>
    </>
  )

  const loginSection = (
    <>
      {isLoggedIn ? (
        <>
          {isDesktopView && <span>Hi, {firstName}</span>}
          {/* <Button size="large" color="inherit" onClick={seedDB}>
                    <Forest />
                    Seed DB
                  </Button> */}
          <IconButton
            size="large"
            color="inherit"
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={itemsInCart} color="warning">
              <ShoppingCartCheckout />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit" onClick={handleClick}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
            {/* <Divider /> */}
            {/* <MenuItem onClick={handleClose}>My orders</MenuItem> */}
            {/* <MenuItem onClick={handleClose}>Wishlist</MenuItem> */}
            <MenuItem onClick={() => navigate("/cart")}>Cart</MenuItem>
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
    </>
  )

  const desktopView = (
    <>
      <Grid item xs={12} md={3}>
        {titleSection}
      </Grid>

      <Grid item xs={12} md={6} align="center">
        {searchSection}
      </Grid>

      <Grid item xs={12} md={3} align="right">
        {loginSection}
      </Grid>
    </>
  )

  const mobileView = (
    <>
      <Grid item xs={6}>
        {titleSection}
      </Grid>
      <Grid item xs={6} align="right">
        {loginSection}
      </Grid>

      <Grid item xs={12} align="center">
        {searchSection}
      </Grid>
    </>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        style={{
          color: "#e4f3f7",
          backgroundColor: "#7a85c1",
          borderBottom: "5px solid #5d6595",
        }}
      >
        <Toolbar>
          <Grid container spacing={2}>
            {isDesktopView ? desktopView : mobileView}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
