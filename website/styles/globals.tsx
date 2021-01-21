import { css } from '@emotion/core';

const cdn = 'https://d2va9gm4j17fy9.cloudfront.net/fonts';

export const globalStyles = css`
  @font-face {
    font-family: 'Akzidenz';
    font-weight: normal;
    src: url('${cdn}/akzidgrostdreg.eot');
    /* IE9 Compat Modes */
    src: url('${cdn}/akzidgrostdreg.eot?#iefix') format('embedded-opentype'),
      /* Pretty Modern Browsers */ url('${cdn}/akzidgrostdreg.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${cdn}/akzidgrostdreg.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: 600;
    src: url('${cdn}/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('${cdn}/akzidgrostdmed.eot?#iefix') format('embedded-opentype'),
      /* IE6-IE8 */ url('${cdn}/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('${cdn}/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${cdn}/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: bold;
    src: url('${cdn}/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('${cdn}/akzidgrostdmed.eot?#iefix') format('embedded-opentype'),
      /* IE6-IE8 */ url('${cdn}/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('${cdn}/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${cdn}/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
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
