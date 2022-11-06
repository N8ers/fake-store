import { useSelector } from "react-redux"

import DefaultHome from "../../components/Home/DefaultHome/DefaultHome"
import SearchResults from "../../components/Home/SearchResults/SearchResults"

// import styles from "./Home.module.css"

function Home() {
  const searchTerm = useSelector((state) => state.searchTerm)

  return (
    <div>
      <div>{searchTerm.length ? <SearchResults /> : <DefaultHome />}</div>
    </div>
  )
}

export default Home
