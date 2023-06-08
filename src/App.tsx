// @ts-expect-error TODO: set tsconfig to allow .web.* and .native.* extensions
import { Router, Route, Routes } from './routing';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<div>Home</div>} />
        <Route path='/fff' element={<div>FFF</div>} />
      </Routes>
    </Router>
  )
}

export default App
