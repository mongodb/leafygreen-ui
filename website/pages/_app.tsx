import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Global } from '@emotion/core';
import { globalStyles } from 'styles/globals';
import BaseLayout from 'layouts/BaseLayout';
import ComponentLayout from 'layouts/ComponentLayout';

function DefaultLayout({ children }) {
  return children;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const layout = router.pathname.split('/').filter(substr => !!substr)[0];

  let SubLayout: React.FunctionComponent;

  switch (layout) {
    case 'component':
      SubLayout = ComponentLayout;
      break;

    default:
      SubLayout = DefaultLayout;
  }

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <SubLayout>
          <Component {...pageProps} />
        </SubLayout>
      </BaseLayout>
    </LeafyGreenProvider>
  );
}

export default MyApp;

