import { Box, Grid, Skeleton } from "@mui/material"

import styles from "./DefaultHome.module.css"

function DefaultHome() {
  return (
    <Box sx={{ flexGrow: 1 }} align="center">
      <Grid container spacing={2} className={styles.container}>
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
