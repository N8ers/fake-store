import { Card, CardActionArea, Box, Grid } from "@mui/material"

function CartItem({ total }) {
  return (
    <Box sx={{ margin: "20px" }}>
      <Card sx={{ padding: "20px" }}>
        <CardActionArea>
          <Grid container spacing={2}>
            <Grid item>
              Cart Total:
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default CartItem
