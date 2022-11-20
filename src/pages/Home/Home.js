import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { fetchTheData } from "../../store"

import DefaultHome from "../../components/Home/DefaultHome/DefaultHome"

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTheData())
  }, [dispatch])

  return (
    <div>
      <DefaultHome />
    </div>
  )
}

export default Home
