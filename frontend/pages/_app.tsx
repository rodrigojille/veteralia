import '../styles/globals.css';
import * as React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { appWithTranslation } from 'next-i18next';

const theme = createTheme({
  palette: {
    primary: { main: '#00BFA6' }, // Inspired by Doctoralia/Airbnb
    secondary: { main: '#FF5A5F' },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
