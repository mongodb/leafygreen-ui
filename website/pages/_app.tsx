import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Global } from '@emotion/core';
import { globalStyles } from 'styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LeafyGreenProvider>
      <Global styles={globalStyles} />
      <Head>
        <title>LeafyGreen - MongoDB Design System</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </LeafyGreenProvider>
  );
}

export default MyApp;
