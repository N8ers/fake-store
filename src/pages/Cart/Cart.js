import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import {
  Box,
  Grid,
  Button,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { checkout } from "../../store/actions"

import CartItem from "../../components/Cart/CartItem/CartItem"
import CartTotal from "../../components/Cart/CartTotal/CartTotal"

import styles from "./Cart.module.css"

function Cart() {
  const dispatch = useDispatch()
  const { cartTotal, items } = useSelector((state) => state.cart)
  const [isCheckedout, setIsCheckedout] = useState(false)

  const handleCheckout = async () => {
    await dispatch(checkout())
    setIsCheckedout(true)
  }

  const handleSnackbarClose = () => {
    setIsCheckedout(false)
  }

  const [topMargin, setTopMargin] = useState("60px")
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  useEffect(() => {
    if (matches) {
      setTopMargin("0px")
    } else {
      setTopMargin("60px")
    }
  }, [matches])

  return (
    <Box className={styles.container} sx={{ marginTop: topMargin }}>
      <h3>Cart</h3>
      <Box
        sx={{ flexGrow: 1, marginTop: "30px", marginLeft: "20px" }}
        align="center"
      >
        <Grid container spacing={5}>
          <Grid align="center">
            {items.map((item) => (
              <CartItem
                key={item.name}
                quantity={item.quantity}
                price={item.price}
                name={item.name}
              />
            ))}

            <CartTotal total={cartTotal} />
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={isCheckedout}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success">
          Checkout Complete! - you're item(s) will never arive :)
        </Alert>
      </Snackbar>
      {!!items.length && (
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={handleCheckout}
        >
          Checkout!
        </Button>
      )}
    </Box>
  )
}

export default Cart
