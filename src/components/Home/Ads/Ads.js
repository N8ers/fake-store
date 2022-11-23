import { useEffect, useState } from "react"
import {
  Box,
  Grid,
  Skeleton,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material"

import { Info } from "@mui/icons-material"

import styles from "./Ads.module.css"

const LargeImg1 = (
  <ImageListItem sx={{ width: 175 }}>
    <img src="/cartoon-candy.png" alt="" />
    <ImageListItemBar
      title="hey"
      subtitle="hi"
      actionIcon={
        <IconButton
          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
          aria-label={`info about ___`}
        >
          <Info />
        </IconButton>
      }
    />
  </ImageListItem>
)

function DefaultHome() {
  const [isBox1Loading, setIsBox1Loading] = useState(true)
  const [isBox2Loading, setIsBox2Loading] = useState(true)
  const [isBox3Loading, setIsBox3Loading] = useState(true)
  const [isBox4Loading, setIsBox4Loading] = useState(true)
  const [isBox5Loading, setIsBox5Loading] = useState(true)

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
    setTimeout(() => {
      setIsBox5Loading(false)
    }, randomSecond())
  }, [])

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
            <Box sx={{ width: 300 }}>
              {isBox2Loading ? (
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
        <Grid item xs={3} align="center">
          <Box className={styles.box}>
            <p>keep shopping for</p>
            <Box sx={{ width: 150 }}>
              {isBox3Loading ? (
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
        <Grid item xs={3} align="center">
          <Box className={styles.box}>
            <p>Early Purple Thursday deals</p>
            <Box sx={{ width: 150 }}>
              {isBox4Loading ? (
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
        <Grid item xs={12} align="center">
          <Box className={styles.box}>
            <p>More items to explore</p>
            <Box sx={{ width: 750 }}>
              {isBox5Loading ? (
                <>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </>
              ) : (
                <Grid container spacing={2}>
                  <Grid item>{LargeImg1}</Grid>
                  <Grid item>{LargeImg1}</Grid>
                  <Grid item>{LargeImg1}</Grid>
                  <Grid item>{LargeImg1}</Grid>
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
