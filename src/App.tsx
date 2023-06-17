import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';

// @ts-expect-error TODO: set tsconfig to allow .web.* and .native.* extensions
import { Router, Route, Routes } from './shared';
import { Home, Form100 } from './components';
import { theme } from './theme';
import './App.css'

const queryClient = new QueryClient();


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form100' element={<Form100 />} />
            <Route path='/form100/:id' element={<Form100 />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
