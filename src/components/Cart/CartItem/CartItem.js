import { Card, CardActionArea, Box, Grid } from "@mui/material"

function CartTotal() {
  return (
    <Box>
      <Card>
        <CardActionArea>
          <Grid container spacing={2}>
            <Grid item>Product Name</Grid>
            <Grid item>Product Discription...</Grid>
            <Grid item>Product Quantity</Grid>
            <Grid item>Total</Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default CartTotal
