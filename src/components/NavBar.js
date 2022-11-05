import {
  AppBar,
  Box,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  InputBase,
  Grid,
} from "@mui/material"

import {
  AccountCircle,
  ShoppingCartCheckout,
  Search,
} from "@mui/icons-material"

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Fake Shop
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search The Real Fake Store!"
                />
                <Search />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton size="large" color="inherit">
                  <ShoppingCartCheckout />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>My account</MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
