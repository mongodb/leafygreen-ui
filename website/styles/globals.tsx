import { css } from '@emotion/react';
import { CDN } from 'utils/routes';

const fontsURL = `${CDN}/fonts`;

export const globalStyles = css`
  /**
   * Euclid
   */

  /* Semibold */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('${fontsURL}/euclid-circular/EuclidCircularA-Semibold-WebXL.woff')
        format('woff'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-Semibold-WebXL.woff2')
        format('woff2'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-Semibold.ttf')
        format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  /* Semibold Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('${fontsURL}/euclid-circular/EuclidCircularA-SemiboldItalic-WebXL.woff')
        format('woff'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-SemiboldItalic-WebXL.woff2')
        format('woff2'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-SemiboldItalic.ttf')
        format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  /* Medium */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('${fontsURL}/euclid-circular/EuclidCircularA-Medium-WebXL.woff')
        format('woff'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-Medium-WebXL.woff2')
        format('woff2'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-Medium.ttf')
        format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  /* Medium Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('${fontsURL}/euclid-circular/EuclidCircularA-MediumItalic-WebXL.woff')
        format('woff'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-MediumItalic-WebXL.woff2')
        format('woff2'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-MediumItalic.ttf')
        format('truetype');
    font-weight: 500;
    font-style: italic;
  }

  /* Normal */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('${fontsURL}/euclid-circular/EuclidCircularA-Regular-WebXL.woff')
        format('woff'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-Regular-WebXL.woff2')
        format('woff2'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-Regular.ttf')
        format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  /* Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('${fontsURL}/euclid-circular/EuclidCircularA-RegularItalic-WebXL.woff')
        format('woff'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-RegularItalic-WebXL.woff2')
        format('woff2'),
      url('${fontsURL}/euclid-circular/EuclidCircularA-RegularItalic.ttf')
        format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  /**
   * Value Serif
   */

  /* Bold */
  @font-face {
    font-family: 'MongoDB Value Serif';
    font-weight: 700;
    src: url('${fontsURL}/value-serif/MongoDBValueSerif-Bold.woff')
        format('woff'),
      url('${fontsURL}/value-serif/MongoDBValueSerif-Bold.woff2')
        format('woff2'),
      url('${fontsURL}/value-serif/MongoDBValueSerif-Bold.ttf')
        format('truetype');
  }

  /* Medium */
  @font-face {
    font-family: 'MongoDB Value Serif';
    font-weight: 500;
    src: url('${fontsURL}/value-serif/MongoDBValueSerif-Medium.woff')
        format('woff'),
      url('${fontsURL}/value-serif/MongoDBValueSerif-Medium.woff2')
        format('woff2'),
      url('${fontsURL}/value-serif/MongoDBValueSerif-Medium.ttf')
        format('truetype');
  }

  /* Normal */
  @font-face {
    font-family: 'MongoDB Value Serif';
    font-weight: 400;
    src: url('${fontsURL}/value-serif/MongoDBValueSerif-Regular.woff')
        format('woff'),
      url('${fontsURL}/value-serif/MongoDBValueSerif-Regular.woff2')
        format('woff2'),
      url('${fontsURL}/value-serif/MongoDBValueSerif-Regular.ttf')
        format('truetype');
  }

  html {
    font-family: 'Euclid Circular A', 'Helvetica Neue', Helvetica, Arial,
      sans-serif;
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
