import { css } from '@emotion/core';

export const globalStyles = css`
  @font-face {
    font-family: 'Akzidenz';
    font-weight: normal;
    font-style: normal;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.eot');
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.eot?#iefix') format('embedded-opentype'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.ttf') format('truetype'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdreg.svg#Akzidenz') format('svg');
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: 600;
    font-style: normal;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.eot');
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.eot?#iefix') format('embedded-opentype'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.ttf') format('truetype'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.svg#Akzidenz') format('svg');
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: bold;
    font-style: normal;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.eot');
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.eot?#iefix') format('embedded-opentype'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.ttf') format('truetype'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/akzidgrostdmed.svg#Akzidenz') format('svg');
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
