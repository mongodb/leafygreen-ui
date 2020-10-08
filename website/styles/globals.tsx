import { css } from '@emotion/core';

export const globalStyles = css`
  @font-face {
    font-family: 'Akzidenz';
    font-weight: normal;
    font-style: normal;
    src: url('/fonts/akzidgrostdreg.eot');
    src: url('/fonts/akzidgrostdreg.eot?#iefix') format('embedded-opentype'),
      url('/fonts/akzidgrostdreg.woff') format('woff'),
      url('/fonts/akzidgrostdreg.ttf') format('truetype'),
      url('/fonts/akzidgrostdreg.svg#Akzidenz') format('svg');
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: medium;
    font-style: normal;
    src: url('fonts/akzidgrostdmed.eot');
    src: url('fonts/akzidgrostdmed.eot?#iefix') format('embedded-opentype'),
      url('fonts/akzidgrostdmed.woff') format('woff'),
      url('fonts/akzidgrostdmed.ttf') format('truetype'),
      url('fonts/akzidgrostdmed.svg#Akzidenz') format('svg');
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: bold;
    font-style: normal;
    src: url('fonts/akzidgrostdmed.eot');
    src: url('fonts/akzidgrostdmed.eot?#iefix') format('embedded-opentype'),
      url('fonts/akzidgrostdmed.woff') format('woff'),
      url('fonts/akzidgrostdmed.ttf') format('truetype'),
      url('fonts/akzidgrostdmed.svg#Akzidenz') format('svg');
  }

  html {
    font-family: 'Akzidenz', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: normal;
    font-style: normal;
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
