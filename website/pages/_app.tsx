import React from 'react';
import type { AppProps } from 'next/app';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Global, css } from '@emotion/core';

const globalStyles = css`
  @font-face {
    font-family: 'Akzidenz';
    font-weight: normal;
    src: local('../assets/akzidgrostdreg.eot');
    /* IE9 Compat Modes */
    src: local('../assets/akzidgrostdreg.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ local('../assets/akzidgrostdreg.woff') format('woff'),
      /* Pretty Modern Browsers */ local('../assets/akzidgrostdreg.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ local('../assets/akzidgrostdreg.svg#Akzidenz')
        format('svg');
  }

  @font-face {
    font-family: 'Akzidenz Medium';
    font-weight: normal;
    src: url('assets/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('assets/akzidgrostdmed.eot?#iefix') format('embedded-opentype'),
      /* IE6-IE8 */ url('assets/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('assets/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('assets/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: bold;
    src: url('assets/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('assets/akzidgrostdmed.eot?#iefix') format('embedded-opentype'),
      /* IE6-IE8 */ url('assets/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('assets/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('assets/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  html {
    font-family: Akzidenz, Times;
  }

  body {
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LeafyGreenProvider>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </LeafyGreenProvider>
  );
}

export default MyApp;
