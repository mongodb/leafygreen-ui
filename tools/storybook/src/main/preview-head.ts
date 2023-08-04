import { StorybookConfig } from '@storybook/react-webpack5';

/**
 * The HTML head for the Storybook preview iframe
 * https://storybook.js.org/docs/react/api/main-config-preview-head
 */
export const previewHead: StorybookConfig['previewHead'] = (head: string) => `
${head}
<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,600;1,400&display=swap"
  rel="stylesheet" />

<style type="text/css">
  html {
    font-family: 'Euclid Circular A', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
    height: 100%;
  }

  body {
    margin: 0 !important;
    padding: 0 !important;
    height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  #docs-root h1,
  #docs-root h2,
  #docs-root code,
  #docs-root img {
    margin-bottom: 24px;
  }

  #docs-root h3,
  #docs-root h4,
  #docs-root h5,
  #docs-root h6 {
    margin-bottom: 16px;
  }

  #docs-root h1:not(:nth-child(1)),
  #docs-root h2:not(:nth-child(1)),
  #docs-root h3:not(:nth-child(1)),
  #docs-root h4:not(:nth-child(1)),
  #docs-root h5:not(:nth-child(1)),
  #docs-root h6:not(:nth-child(1)) {
    /* this acts like a margin-bottom for the following p tag in lieu of a previous sibling selector */
    margin-top: 40px !important;
  }

  #docs-root p {
    margin-bottom: 16px;
  }

  /**
   * Euclid
   */

  /* Semibold */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Semibold-WebXL.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Semibold-WebXL.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Semibold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  /* Semibold Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-SemiboldItalic-WebXL.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-SemiboldItalic-WebXL.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-SemiboldItalic.ttf') format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  /* Medium */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Medium-WebXL.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Medium-WebXL.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  /* Medium Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-MediumItalic-WebXL.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-MediumItalic-WebXL.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-MediumItalic.ttf') format('truetype');
    font-weight: 500;
    font-style: italic;
  }

  /* Normal */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular-WebXL.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular-WebXL.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  /* Italic */
  @font-face {
    font-family: 'Euclid Circular A';
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-RegularItalic-WebXL.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-RegularItalic-WebXL.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-RegularItalic.ttf') format('truetype');
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
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Bold.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Bold.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Bold.ttf') format('truetype');
  }

  /* Medium */
  @font-face {
    font-family: 'MongoDB Value Serif';
    font-weight: 500;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Medium.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Medium.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Medium.ttf') format('truetype');
  }

  /* Normal */
  @font-face {
    font-family: 'MongoDB Value Serif';
    font-weight: 400;
    src: url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.woff') format('woff'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.woff2') format('woff2'),
      url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.ttf') format('truetype');
  }
</style>
`;
