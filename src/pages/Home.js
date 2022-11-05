import { useState } from "react"

import DefaultHome from "../components/Home/DefaultHome"
import SearchResults from "../components/Home/SearchResults"

import styles from "./Home.module.css"

function Home() {
  const [isSearching, setIsSearching] = useState(false)

  return (
    <div>
      <button onClick={() => setIsSearching(!isSearching)}>toggle!</button>
      <div>{isSearching ? <SearchResults /> : <DefaultHome />}</div>
    </div>
  )
}

export default Home
