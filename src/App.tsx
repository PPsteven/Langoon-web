import { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import "./styles/global.css"

// Import lazy pages
const Subtitles = lazy(() => import('./pages/Subtitles/Subtitles'))

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/subtitles" element={<Subtitles />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
