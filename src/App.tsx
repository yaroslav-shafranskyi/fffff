import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";

// @ts-expect-error TODO: set tsconfig to allow .web.* and .native.* extensions
import { Router, Route, Routes } from "./shared";
import {
  Home,
  Form100,
  PersonsTable,
  Discharge,
  PersonComponent,
  Referral,
  Conclusion,
  Header,
  Login,
  UserPage,
} from "./components";
import { theme } from "./theme";
import "./App.css";
import {
  conclusionUrl,
  dischargeUrl,
  form100Url,
  loginUrl,
  personsUrl,
  referralUrl,
  userUrl,
} from "./constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 24 * 60 * 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <Routes>
            <Route path={loginUrl} element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path={form100Url} element={<Form100 />} />
            <Route path={`${form100Url}/:personId`} element={<Form100 />} />
            <Route
              path={`${form100Url}/:personId/:formId`}
              element={<Form100 />}
            />
            <Route path={personsUrl} element={<PersonsTable />} />
            <Route path={`${personsUrl}/:id`} element={<PersonComponent />} />
            <Route path={`${dischargeUrl}/:personId`} element={<Discharge />} />
            <Route
              path={`${dischargeUrl}/:personId/:formId`}
              element={<Discharge />}
            />
            <Route path={`${referralUrl}/:personId`} element={<Referral />} />
            <Route
              path={`${referralUrl}/:personId/:formId`}
              element={<Referral />}
            />
            <Route path={conclusionUrl} element={<Conclusion />} />
            <Route
              path={`${conclusionUrl}/:personId`}
              element={<Conclusion />}
            />
            <Route
              path={`${conclusionUrl}/:personId/:formId`}
              element={<Conclusion />}
            />
            <Route path={`${userUrl}/:userId`} element={<UserPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
