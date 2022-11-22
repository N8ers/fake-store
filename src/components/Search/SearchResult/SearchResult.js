import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  Dialog,
  DialogTitle,
  MenuItem,
  Typography,
} from "@mui/material"

import { addToCart } from "../../../store/index"

function SearchResult({ id, imageUrl, name, price }) {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const cartItems = useSelector((state) => state.cart.items)

  const [addToCartDialog, setAddToCartDialog] = useState(false)
  const [quantityOfItemInCart, setQuantityOfItemInCart] = useState(0)

  const [quantity, setQuantity] = useState(0)
  const formOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  useEffect(() => {
    const cartItem = cartItems.filter((item) => item.name === name)[0]

    if (cartItem) {
      setQuantityOfItemInCart(cartItem.quantity)
    }
  }, [dispatch, cartItems, name])

  const updateCartItem = () => {
    dispatch(addToCart({ name, price, quantity }))
    setAddToCartDialog(false)
  }

  const addItemToCart = () => {
    if (quantityOfItemInCart) {
      setAddToCartDialog(true)
    } else {
      dispatch(addToCart({ name, price, quantity }))
    }

    /**
     * Also show success toast when added to cart
     */
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="140" image="/cartoon-candy.png" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Product discription...
        </Typography>
        <Typography variant="h4" color="text.secondary">
          ${price}
        </Typography>

        {isLoggedIn && (
          <>
            <Select
              size="small"
              variant="standard"
              value={quantity}
              label="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            >
              {formOptions.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Button disabled={!quantity} onClick={addItemToCart}>
              Add to Cart!
            </Button>
          </>
        )}
      </CardContent>

      <Dialog open={addToCartDialog}>
        <DialogTitle>Item is already in cart</DialogTitle>
        <p>
          You already have {quantityOfItemInCart} of {name} in your cart.
        </p>
        <p>
          Do you want to update your cart to have {quantity} of {name}?
        </p>
        <Button onClick={() => setAddToCartDialog(false)}>No</Button>
        <Button onClick={updateCartItem}>Yes</Button>
      </Dialog>
    </Card>
  )
}

export default SearchResult
