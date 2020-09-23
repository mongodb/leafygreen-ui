import React from 'react';
import type { AppProps } from 'next/app';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LeafyGreenProvider>
      <Component {...pageProps} />
    </LeafyGreenProvider>
  );
}

export default MyApp;
