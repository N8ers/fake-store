import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material"

function SearchResult() {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image="/cartoon-candy.png" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Product Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Product discription...
          </Typography>
          <Typography variant="h4" color="text.secondary">
            $43.20
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default SearchResult
