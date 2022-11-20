import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Box, Grid } from "@mui/material"

import SearchResult from "../../components/Search/SearchResult/SearchResult"

import styles from "./Search.module.css"

function Search() {
  const searchTerm = useSelector((state) => state.search.searchTerm)
  const searchResults = useSelector((state) => state.search.searchResults)

  const [filteredResults, setFilteredResults] = useState([])

  useEffect(() => {
    if (searchResults.hardcandy) {
      const result = searchResults.hardcandy.filter((item) =>
        item.name.includes(searchTerm)
      )
      setFilteredResults(result)
    }
  }, [searchResults, searchTerm])

  return (
    <div className={styles.container}>
      <h3>Results For: "{searchTerm}"</h3>

      <Box sx={{ flexGrow: 1 }} align="center">
        <Grid container spacing={5}>
          {filteredResults.map((result) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              align="center"
              key={result.id}
            >
              <Box>
                <SearchResult
                  id={result.id}
                  imageUrl={result.imageUrl}
                  name={result.name}
                  price={result.price}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default Search
