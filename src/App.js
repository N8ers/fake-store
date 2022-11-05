import { Route, Routes } from "react-router-dom"

import NavBar from "./components/NavBar"

import Home from "./pages/Home"
import UserSettings from "./pages/UserSettings"

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </div>
  )
}

export default App
