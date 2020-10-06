import React from 'react';
import type { AppProps } from 'next/app';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Global } from '@emotion/core';
import { globalStyles } from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LeafyGreenProvider>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </LeafyGreenProvider>
  );
}

export default MyApp;
