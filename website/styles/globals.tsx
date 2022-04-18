import { css } from '@emotion/react';
import { CDN } from 'utils/routes';

const fontsURL = `${CDN}/fonts`;

export const globalStyles = css`
  @font-face {
    font-family: 'Akzidenz';
    font-weight: normal;
    src: url('${fontsURL}/akzidgrostdreg.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdreg.eot?#iefix')
        format('embedded-opentype'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdreg.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdreg.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: 600;
    src: url('${fontsURL}/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdmed.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('${fontsURL}/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: bold;
    src: url('${fontsURL}/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdmed.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('${fontsURL}/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  /**
   * Euclid
   */

  /* Semibold */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Semibold-WebXL.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Semibold-WebXL.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Semibold.ttf')
        format('truetype');
    font-weight: 700, bold;
    font-style: normal;
  }

  /* Semibold Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-SemiboldItalic-WebXL.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-SemiboldItalic-WebXL.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-SemiboldItalic.ttf')
        format('truetype');
    font-weight: 700, bold;
    font-style: italic;
  }

  /* Medium */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Medium-WebXL.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Medium-WebXL.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Medium.ttf')
        format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  /* Medium Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-MediumItalic-WebXL.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-MediumItalic-WebXL.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-MediumItalic.ttf')
        format('truetype');
    font-weight: 500;
    font-style: italic;
  }

  /* Normal */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular-WebXL.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular-WebXL.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular.ttf')
        format('truetype');
    font-weight: 400, normal;
    font-style: normal;
  }

  /* Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-RegularItalic-WebXL.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-RegularItalic-WebXL.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-RegularItalic.ttf')
        format('truetype');
    font-weight: 400, normal;
    font-style: italic;
  }

  /**
   * Value Serif
   */

  /* Bold */
  @font-face {
    font-family: 'MongoDB Value Serif';
    font-weight: 700, bold;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Bold.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Bold.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Bold.ttf')
        format('truetype');
  }

  /* Medium */
  @font-face {
    font-family: 'MongoDB Value Serif';
    font-weight: 500;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Medium.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Medium.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Medium.ttf')
        format('truetype');
  }

  /* Normal */
  @font-face {
    font-family: 'MongoDB Value Serif';
    font-weight: 400, normal;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.woff')
        format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.woff2')
        format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.ttf')
        format('truetype');
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

  h1 > a,
  h2 > a,
  h3 > a,
  h4 > a,
  h5 > a,
  h6 > a {
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

  li {
    margin: 12px 0;
    line-spacing: 1.6;
  }
`;
