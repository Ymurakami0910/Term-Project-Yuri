import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import Details from "./pages/Details.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/art/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
