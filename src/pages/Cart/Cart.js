import { Box, Grid, Button } from "@mui/material"
import { useSelector } from "react-redux"

import CartItem from "../../components/Cart/CartItem/CartItem"
import CartTotal from "../../components/Cart/CartTotal/CartTotal"

import styles from "./Cart.module.css"

function Cart() {
  const { cartTotal, items } = useSelector((state) => state.cart)

  return (
    <div className={styles.container}>
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

      <Button size="large" color="primary" variant="contained">
        Checkout!
      </Button>
    </div>
  )
}

export default Cart
