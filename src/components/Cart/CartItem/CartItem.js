import { useState } from "react"
import { Card, Box, Grid, IconButton, Select, MenuItem } from "@mui/material"
import { Delete } from "@mui/icons-material"

function CartTotal({ name, quantity, price }) {
  const [formQuantity, setFormQuantity] = useState(quantity)

  const formOptions = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <Box sx={{ margin: "20px" }}>
      <Card sx={{ padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item>{name}</Grid>
          <Grid item>
            <Select
              value={formQuantity}
              label="quantity"
              onChange={(value) => setFormQuantity(value)}
            >
              {formOptions.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            {(quantity * price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Grid>
          <Grid item>
            <IconButton color="primary" sx={{ p: "10px" }}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default CartTotal
