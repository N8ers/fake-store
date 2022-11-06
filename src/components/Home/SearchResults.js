import { Box, Grid } from "@mui/material"

import SearchResult from "./SearchResult"

import styles from "./SearchResults.module.css"

function SearchResults() {
  const results = [1, 2, 3, 4, 5, 6]

  return (
    <div className={styles.container}>
      <h3>Results For: (...put in here)</h3>

      <Box sx={{ flexGrow: 1 }} align="center">
        <Grid container spacing={2}>
          {results.map(() => (
            <Grid item xs={12} sm={6} md={4} lg={3} align="center">
              <Box>
                <SearchResult />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default SearchResults