import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { globalStyles } from 'styles/globals';
import BaseLayout from 'layouts/BaseLayout';
import ComponentLayout from 'layouts/ComponentLayout';
import metaTagKey from 'utils/metaTagKey';
import FoundationLayout from 'layouts/FoundationLayout';
import {
  Body,
  H1,
  H2,
  H3,
  InlineCode,
  Link,
  Subtitle,
} from '@leafygreen-ui/typography';

const headerStyle = css`
  margin-block: 0.5em;
  a,
  p {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  & > a {
    color: inherit;
    text-decoration: none;
    position: relative;

    :after {
      content: url(/connect.svg);
      position: absolute;
      left: 100%;
      top: 2px;
      margin-left: 8px;
      opacity: 0;
    }

    &:hover:after {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const MDXComponentMap = {
  h1: styled(H1 as any)`
    ${headerStyle}
  `,
  h2: styled(H2 as any)`
    ${headerStyle}
  `,
  h3: styled(H3 as any)`
    ${headerStyle}
  `,
  h4: styled(Subtitle as any)`
    ${headerStyle}
  `,
  h5: styled.h5`
    ${headerStyle}
  `,
  h6: styled.h6`
    ${headerStyle}
  `,
  code: InlineCode,
  p: styled(Body as any)`
    margin-block: 1em;
    // Keep inline code inline
    code {
      display: inline;
    }
  `,
  a: styled(Link as any)`
    span,
    p {
      display: inline;
    }
  `,
  li: styled.li`
    margin: 12px 0;
    line-height: 1.6;
  `,
};

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

    case 'foundation':
      SubLayout = FoundationLayout;
      break;

    default:
      SubLayout = DefaultLayout;
  }

  return (
    /// @ts-expect-error
    <MDXProvider components={MDXComponentMap}>
      <Head>
        <title>Home – LeafyGreen Design System | MongoDB</title>
        <meta
          name="description"
          content="MongoDB's open-source, accessible design system for designing and building web applications with React."
        />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="generator" content="LeafyGreen UI" />

        <meta
          property="og:title"
          content="LeafyGreen - MongoDB Design System"
          key={metaTagKey.Title}
        />
        <meta
          property="og:site_name"
          content="LeafyGreen - MongoDB Design System"
        />
        <meta property="og:url" content="https://mongodb.design" />
        <meta
          property="og:description"
          content="MongoDB's open-source, accessible design system for designing and building web applications with React."
          key={metaTagKey.Description}
        />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/favicon.ico" />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-VFTH2BJVVK`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', G-VFTH2BJVVK, {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Global styles={globalStyles} />
      <BaseLayout>
        <SubLayout>
          <Component {...pageProps} />
        </SubLayout>
      </BaseLayout>
    </MDXProvider>
  );
}

export default MyApp;
