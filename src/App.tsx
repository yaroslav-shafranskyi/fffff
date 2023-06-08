import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, ThemeProvider } from '@mui/material';

import { Home } from './components/Home';

// @ts-expect-error TODO: set tsconfig to allow .web.* and .native.* extensions
import { Router, Route, Routes } from './routing';
import './App.css'

const queryClient = new QueryClient();

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/fff' element={<div>FFF</div>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
