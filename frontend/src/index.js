import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as UrqlProvider } from 'urql';
import { createClient, cacheExchange, fetchExchange } from '@urql/core'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import store from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = createClient({
  url: 'http://localhost:4000/',
  exchanges: [cacheExchange, fetchExchange],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme();

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <UrqlProvider value={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </UrqlProvider>
    </ReduxProvider>
  </React.StrictMode>
);

reportWebVitals();