import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Global } from '@emotion/core';
import { globalStyles } from 'styles/globals';
import BaseLayout from 'layouts/BaseLayout';
import ComponentLayout from 'layouts/ComponentLayout';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import util from 'util';
import markdownToHtml from 'utils/markdownToHtml';
import type { BaseLayoutProps } from 'utils/types';

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

const getFileContent = util.promisify(fs.readFile);

export const getStaticProps: GetStaticProps = async (params) => {
  console.log(params)

  const props: Partial<BaseLayoutProps> = { component: 'badge' };

  let changelogMarkdown: '' | Buffer = '';
  let readmeMarkdown = '';

  try {
    changelogMarkdown = await getFileContent(
      path.join('../packages/badge/CHANGELOG.md'),
    );
  } catch (error) {
    console.warn(error);
  }

  try {
    readmeMarkdown = await getFileContent(
      path.join('../packages/badge/README.md'),
      'utf-8',
    );
  } catch (error) {
    console.warn(error);
  }

  props.changelog = await markdownToHtml(changelogMarkdown);

  props.readme = readmeMarkdown;

  return {
    props,
  };
};

