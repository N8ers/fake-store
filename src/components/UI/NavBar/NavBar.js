import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
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
  Dialog,
  TextField,
  DialogTitle,
  Button,
  Grid,
  FormControl,
  FormLabel,
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
  seedDB,
} from "../../../store"

function NavBar() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

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

  // LOGIN DIALOG
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const login = () => {
    alert(username, password)
  }

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    console.log(user)
    console.log(user.uid)
    const userDocRef = await createUserDocumentFromAuth(user)
    console.log({ userDocRef })
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
                  <Button size="large" color="inherit" onClick={seedDB}>
                    <Forest />
                    Seed DB
                  </Button>
                  <IconButton size="large" color="inherit">
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
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>{" "}
                </>
              ) : (
                <Button variant="contained" onClick={logGoogleUser}>
                  Log In
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Dialog open={isOpen}>
        <Button onClick={logGoogleUser}>Google Signin</Button>

        {/* <DialogTitle>Login</DialogTitle>

        <FormControl>
          <TextField id="name-input" name="name" label="email" type="text" />
          <TextField id="name-input" name="name" label="password" type="text" />

          <Button onClick={logGoogleUser}>Google Signin</Button>

          <FormLabel>Sign In</FormLabel>
        </FormControl>

        <Button>Sign Up</Button>
        <Button onClick={() => setIsOpen(false)}>CLOSE</Button> */}
      </Dialog>
    </Box>
  )
}

export default NavBar
