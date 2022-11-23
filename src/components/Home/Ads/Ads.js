import { useEffect, useState } from "react"
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  Skeleton,
  ImageList,
  ImageListItem,
} from "@mui/material"

import { Info } from "@mui/icons-material"

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

  const itemMedium = (
    <Grid item sx={{ justifyContent: "center" }}>
      <Card>
        <CardActionArea>
          <CardMedia component="img" height="80" image="/cartoon-candy.png" />
          <CardContent>
            <Typography>Butter Scotch</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )

  const itemSmall = (
    <Grid item sx={{ justifyContent: "center" }}>
      <Card>
        <CardActionArea>
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

  return (
    <Box sx={{ flexGrow: 1 }} align="center">
      <Grid container spacing={2} className={styles.container}>
        <Grid item xs={12} align="center">
          <Box className={styles.banner}>
            <h2>Welcome to a real Fake Store</h2>
            <p>
              Have you ever wanted the electrifying buzz of ordering things
              online, but don't want to actually pay? Then come visit the Real
              Fake Store, it's really fake!!
            </p>
            {/* <p>Learn more about the Real Fake store on our About page.</p> */}
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box className={styles.box}>
            <h2>Purple Thursday</h2>
            <p>
              Shop the hottest deals this Purple Thursday, now available all
              month long!
            </p>
            <Box sx={{ width: 750 }}>
              {isBox1Loading ? (
                <>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </>
              ) : (
                "Loaded"
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} align="center">
          <Box className={styles.box}>
            <p>Recommeneded for you</p>
            <Box>
              {isBox2Loading ? (
                <>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </>
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
        </Grid>
        <Grid item xs={3} align="center">
          <Box className={styles.box}>
            <p>keep shopping for</p>
            <Box sx={{ width: 150 }}>
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
        </Grid>
        <Grid item xs={3} align="center">
          <Box className={styles.box}>
            <p>Early Purple Thursday Deals</p>
            <Box sx={{ width: 150 }}>
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
        </Grid>
      </Grid>
    </Box>
  )
}

export default DefaultHome
