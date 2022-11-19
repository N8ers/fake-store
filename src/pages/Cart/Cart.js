import { Box, Grid } from "@mui/material"

import CartItem from "../../components/Cart/CartItem/CartItem"
import CartTotal from "../../components/Cart/CartTotal/CartTotal"

import styles from "./Cart.module.css"

function Cart() {
  return (
    <div className={styles.container}>
      <h3>Cart</h3>

      <Box sx={{ flexGrow: 1 }} align="center">
        <Grid container spacing={5}>
          <Grid align="center">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />

            <CartTotal />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Cart
