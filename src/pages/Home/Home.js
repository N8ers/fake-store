import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { fetchTheData } from "../../store/actions"

import Ads from "../../components/Home/Ads/Ads"

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTheData())
  }, [dispatch])

  return (
    <div>
      <Ads />
    </div>
  )
}

export default Home
