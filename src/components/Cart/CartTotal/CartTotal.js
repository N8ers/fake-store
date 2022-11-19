import { Card, CardActionArea, Box, Grid } from "@mui/material"

function CartItem() {
  return (
    <Box>
      <Card>
        <CardActionArea>
          <Grid container spacing={2}>
            <Grid item>Sum Total</Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default CartItem
