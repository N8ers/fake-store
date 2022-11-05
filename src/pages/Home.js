import { Box, Grid } from "@mui/material"

import styles from "./Home.module.css"

function Home() {
  return (
    <Box sx={{ flexGrow: 1 }} align="center">
      <Grid container spacing={2} className={styles.container}>
        <Grid item xs={12} align="center">
          <Box className={styles.boxOne}>
            <h2>Purple Thursday</h2>
            <p>
              Shop the hottest deals this Purple Thursday, now available all
              month long!
            </p>
          </Box>
        </Grid>
        <Grid item xs={6} align="center">
          <Box className={styles.boxTwo}>
            <div>Recommeneded for you</div>
          </Box>
        </Grid>
        <Grid item xs={3} align="center">
          <Box className={styles.boxThree}>
            <div>keep shopping for</div>
          </Box>
        </Grid>
        <Grid item xs={3} align="center">
          <Box className={styles.boxFour}>
            <div>Early Purple Thursday deals</div>
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box className={styles.boxFive}>
            <div>More items to explore</div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
