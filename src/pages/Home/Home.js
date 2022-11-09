import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { fetchTheData } from "../../store"

import DefaultHome from "../../components/Home/DefaultHome/DefaultHome"
import SearchResults from "../../components/Home/SearchResults/SearchResults"

// import styles from "./Home.module.css"

function Home() {
  const searchTerm = useSelector((state) => state.search.searchTerm)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTheData())
  }, [dispatch])

  return (
    <div>
      <div>{searchTerm.length ? <SearchResults /> : <DefaultHome />}</div>
    </div>
  )
}

export default Home
