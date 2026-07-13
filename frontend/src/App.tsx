import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Theme from './pages/Theme'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="theme" element={<Theme />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
