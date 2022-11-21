import { Box, Grid, Skeleton } from "@mui/material"

import styles from "./Ads.module.css"

function DefaultHome() {
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
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} align="center">
          <Box className={styles.box}>
            <p>Recommeneded for you</p>
            <Box sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} align="center">
          <Box className={styles.box}>
            <p>keep shopping for</p>
            <Box sx={{ width: 150 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} align="center">
          <Box className={styles.box}>
            <p>Early Purple Thursday deals</p>
            <Box sx={{ width: 150 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box className={styles.box}>
            <p>More items to explore</p>
            <Box sx={{ width: 750 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DefaultHome
