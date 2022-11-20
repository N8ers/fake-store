import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@mui/material"

import { addToCart } from "../../../store/index"

function SearchResult({ id, imageUrl, name, price }) {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  const [quantity, setQuantity] = useState(0)
  const formOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const addItemToCart = () => {
    dispatch(addToCart({ name, price, quantity }))
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
            <Button onClick={addItemToCart}>Add to Cart!</Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default SearchResult
