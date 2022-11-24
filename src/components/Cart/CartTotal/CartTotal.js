import { Card, Box, Grid } from "@mui/material"

function CartItem({ total }) {
  return (
    <Box sx={{ margin: "20px" }}>
      <Card sx={{ padding: "20px" }}>
        <Grid container spacing={2} align="left">
          <Grid item xs={6}>
            Cart Total:
          </Grid>
          <Grid item xs={6} align="right">
            <b>
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </b>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default CartItem
