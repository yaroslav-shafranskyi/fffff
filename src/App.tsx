import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';

// @ts-expect-error TODO: set tsconfig to allow .web.* and .native.* extensions
import { Router, Route, Routes } from './shared';
import { Home, Form100, PersonsTable, Discharge, PersonPage, Referral } from './components';
import { theme } from './theme';
import './App.css'
import { dischargeUrl, form100Url, personsUrl, referralUrl } from './constants';

const queryClient = new QueryClient();


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path={form100Url} element={<Form100 />} />
            <Route path={`${form100Url}/:personId`} element={<Form100 />} />
            <Route path={`${form100Url}/:personId/:formId`} element={<Form100 />} />
            <Route path={personsUrl} element={<PersonsTable />} />
            <Route path={`${personsUrl}/:id`} element={<PersonPage />} />
            <Route path={`${dischargeUrl}/:personId`} element={<Discharge />} />
            <Route path={`${dischargeUrl}/:personId/:formId`} element={<Discharge />} />
            <Route path={`${referralUrl}/:personId`} element={<Referral />} />
            <Route path={`${referralUrl}/:personId/:formId`} element={<Referral />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
