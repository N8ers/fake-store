import { useDispatch } from "react-redux"
import {
  Card,
  Box,
  Grid,
  IconButton,
  Select,
  MenuItem,
  Typography,
} from "@mui/material"
import { Delete } from "@mui/icons-material"

import {
  removeItemFromCartThunk,
  updateCartQuantityThunk,
} from "../../../store/index"

function CartTotal({ name, quantity, price }) {
  const dispatch = useDispatch()

  const formOptions = [1, 2, 3, 4, 5, 6, 7, 8]

  const removeItem = () => {
    dispatch(removeItemFromCartThunk(name))
  }

  const updateQuantity = (e) => {
    dispatch(updateCartQuantityThunk(name, e.target.value))
  }

  return (
    <Box sx={{ margin: "20px" }}>
      <Card sx={{ padding: "20px", width: "330px" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography align="left" variant="h6">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={2} align="right">
            <b>
              {price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </b>
          </Grid>

          <Grid item xs={6} align="left">
            <Select
              size="small"
              variant="standard"
              value={quantity}
              label="quantity"
              onChange={updateQuantity}
            >
              {formOptions.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} align="right">
            <IconButton color="primary" sx={{ p: "10px" }} onClick={removeItem}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default CartTotal
