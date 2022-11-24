import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  Skeleton,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"

import styles from "./Ads.module.css"

function DefaultHome() {
  const [isBox1Loading, setIsBox1Loading] = useState(true)
  const [isBox2Loading, setIsBox2Loading] = useState(true)
  const [isBox3Loading, setIsBox3Loading] = useState(true)
  const [isBox4Loading, setIsBox4Loading] = useState(true)

  const randomSecond = () => {
    return Math.floor(Math.random() * (1000 - 150) + 150)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsBox1Loading(false)
    }, randomSecond())
    setTimeout(() => {
      setIsBox2Loading(false)
    }, randomSecond())
    setTimeout(() => {
      setIsBox3Loading(false)
    }, randomSecond())
    setTimeout(() => {
      setIsBox4Loading(false)
    }, randomSecond())
  }, [])

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/search")
  }

  const itemLarge = (
    <Grid item xs={6} sm={4} md={2}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardMedia component="img" image="/cartoon-candy.png" />
          <CardContent>
            <Typography>Butter Scotch</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )

  const itemMedium = (
    <Grid item xs={6} sm={4} md={4}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardMedia component="img" height="80" image="/cartoon-candy.png" />
          <CardContent>
            <Typography>Butter Scotch</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )

  const skeletonMedium = (
    <Grid item>
      <Skeleton variant="rounded" width={130} height={130} animation="wave" />
    </Grid>
  )

  const itemSmall = (
    <Grid item xs={6}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardMedia component="img" height="50" image="/cartoon-candy.png" />
        </CardActionArea>
      </Card>
    </Grid>
  )

  const skeletonSmall = (
    <Grid item>
      <Skeleton variant="rounded" width={45} height={45} animation="wave" />
    </Grid>
  )

  const banner = (
    <Box className={styles.banner}>
      <h2>Welcome to a real Fake Store</h2>
      <p>
        Have you ever wanted the electrifying buzz of ordering things online,
        but don't want to actually pay? Then come visit the Real Fake Store,
        it's really fake!!
      </p>
      {/* <p>Learn more about the Real Fake store on our About page.</p> */}
    </Box>
  )

  const adOne = (
    <Box className={styles.boxOne}>
      <h2>Purple Thursday</h2>
      <p>
        Shop the hottest deals this Purple Thursday, now available all month
        long!
      </p>
      <Box sx={{ maxWidth: 1000 }}>
        {isBox1Loading ? (
          <Box>
            <Grid container spacing={2}>
              {skeletonMedium}
              {skeletonMedium}
              {skeletonMedium}
              {skeletonMedium}
              {skeletonMedium}
            </Grid>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={2}>
              {itemLarge}
              {itemLarge}
              {itemLarge}
              {itemLarge}
              {itemLarge}
              {itemLarge}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )

  const adTwo = (
    <Box className={styles.boxOne}>
      <p>Recommeneded for you</p>
      <Box>
        {isBox2Loading ? (
          <Box>
            <Grid container spacing={2}>
              {skeletonMedium}
              {skeletonMedium}
              {skeletonMedium}
            </Grid>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={2}>
              {itemMedium}
              {itemMedium}
              {itemMedium}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )

  const adThree = (
    <Box className={styles.boxThree}>
      <p className={styles.boxThreeTitle}>Keep shopping for</p>
      <Box>
        {isBox3Loading ? (
          <Grid container spacing={2}>
            {skeletonSmall}
            {skeletonSmall}
            {skeletonSmall}
            {skeletonSmall}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {itemSmall}
            {itemSmall}
            {itemSmall}
            {itemSmall}
          </Grid>
        )}
      </Box>
    </Box>
  )

  const adFour = (
    <Box className={styles.boxThree}>
      <p className={styles.boxThreeTitle}>Early Purple Thursday Deals</p>
      <Box>
        {isBox4Loading ? (
          <Grid container spacing={2}>
            {skeletonSmall}
            {skeletonSmall}
            {skeletonSmall}
            {skeletonSmall}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {itemSmall}
            {itemSmall}
            {itemSmall}
            {itemSmall}
          </Grid>
        )}
      </Box>
    </Box>
  )

  const [topMargin, setTopMargin] = useState("60px")
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  useEffect(() => {
    if (matches) {
      setTopMargin("0px")
    } else {
      setTopMargin("60px")
    }
  }, [matches])

  return (
    <Box sx={{ flexGrow: 1, marginTop: topMargin }} align="center">
      <Grid container spacing={2} className={styles.container}>
        <Grid item xs={12} align="center">
          {banner}
        </Grid>
        <Grid item xs={12} align="center">
          {adOne}
        </Grid>
        <Grid item xs={12} md={6} align="center">
          {adTwo}
        </Grid>
        <Grid item xs={6} md={3} align="center">
          {adThree}
        </Grid>
        <Grid item xs={6} md={3} align="center">
          {adFour}
        </Grid>
      </Grid>
    </Box>
  )
}

export default DefaultHome
