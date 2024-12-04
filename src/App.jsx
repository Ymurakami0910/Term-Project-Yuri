import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import Details from "./pages/Details.jsx"
import Gallery from "./pages/Gallery.jsx"
import Western from "./pages/Western.jsx"
import WesternDetail from "./WesternDetail.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/art/:id" element={<Details />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/western" element={<Western />} />
        <Route path="/artist/:id" element={<WesternDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
