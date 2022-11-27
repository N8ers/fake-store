import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  Dialog,
  Snackbar,
  Alert,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Typography,
} from "@mui/material"

import { addToCart } from "../../../store/actions"

import {
  sign_user_in,
  createUserDocumentFromAuth,
} from "../../../firebase/firebaseHelpers"

function SearchResult({ id, imageUrl, name, price }) {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const cartItems = useSelector((state) => state.cart.items)

  const [addToCartDialog, setAddToCartDialog] = useState(false)
  const [quantityOfItemInCart, setQuantityOfItemInCart] = useState(0)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const [quantity, setQuantity] = useState(0)
  const formOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const handleSnackbarClose = () => {
    setIsAddedToCart(false)
  }

  useEffect(() => {
    const cartItem = cartItems.filter((item) => item.name === name)[0]

    if (cartItem) {
      setQuantityOfItemInCart(cartItem.quantity)
    }
  }, [dispatch, cartItems, name])

  const updateCartItem = () => {
    dispatch(addToCart({ name, price, quantity }))
    setIsAddedToCart(true)
    setAddToCartDialog(false)
  }

  const addItemToCart = () => {
    if (quantityOfItemInCart) {
      setAddToCartDialog(true)
    } else {
      dispatch(addToCart({ name, price, quantity }))
      setIsAddedToCart(true)
    }
  }

  const logGoogleUser = async () => {
    const { user } = await sign_user_in()
    const result = await createUserDocumentFromAuth(user)
    const payload = {
      displayName: result.displayName,
      email: result.email,
      uid: result.uid,
    }
    dispatch({ type: "user/SET_USER", payload: payload })
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

        {isLoggedIn ? (
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
        ) : (
          <Button onClick={logGoogleUser}>Add to Cart!</Button>
        )}
      </CardContent>

      <Dialog open={addToCartDialog}>
        <DialogTitle>Item is already in cart</DialogTitle>

        <DialogContent>
          <DialogContentText>
            You already have <b>{quantityOfItemInCart}</b> <b>{name}</b> in your
            cart.
            <br />
            Do you want to update your cart to have <b>{quantity}</b>{" "}
            <b>{name}</b>?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAddToCartDialog(false)}>No</Button>
          <Button onClick={updateCartItem}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={isAddedToCart}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success">
          Added {quantity} {name} to your cart
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default SearchResult
