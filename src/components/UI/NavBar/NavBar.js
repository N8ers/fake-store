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
  DialogTitle,
  Button,
  Grid,
} from "@mui/material"

import {
  AccountCircle,
  ShoppingCartCheckout,
  Search,
} from "@mui/icons-material"

function NavBar() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch({ type: "search/SEARCH_TERM", payload: search })
  }

  const [search, setSearch] = useState("")

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
                <Button variant="contained" onClick={() => setIsOpen(true)}>
                  Log In
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Dialog open={isOpen}>
        <DialogTitle>Login</DialogTitle>
        <Button onClick={() => setIsOpen(false)}>CLOSE</Button>
      </Dialog>
    </Box>
  )
}

export default NavBar
