import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from './components/Home';

// @ts-expect-error TODO: set tsconfig to allow .web.* and .native.* extensions
import { Router, Route, Routes } from './routing';
import './App.css'

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/fff' element={<div>FFF</div>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
