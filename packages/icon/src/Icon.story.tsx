import React from 'react';
import Icon, { glyphs, Size, createIconComponent } from '.';
import { css } from '@leafygreen-ui/emotion';
import { storiesOf } from '@storybook/react';
import { color, select } from '@storybook/addon-knobs';
import { uiColors } from '@leafygreen-ui/palette';

const containerStyle = css`
  width: 150px;
  height: 70px;
  flex-shrink: 0;
  text-align: center;
  border: 1px solid #babdbe;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem;
`;

const textStyle = css`
  font-size: 12px;
  color: ${uiColors.gray.base};
  margin-top: 0.5rem;
`;

storiesOf('Icons', module)
  .add('Icon', () => {
    const fill = color('Fill', '#000000');
    const size = select('size', Object.values(Size), Size.Default);

    const renderGlyph = (glyph: string) => (
      <div key={glyph} className={containerStyle}>
        <Icon glyph={glyph} fill={fill} size={size} />
        <div className={textStyle}>{glyph}</div>
      </div>
    );

    return <>{Object.keys(glyphs).map(renderGlyph)}</>;
  })
  .add('Custom Icon', () => {
    const fill = color('Fill', '#000000');
    const size = select('size', Object.values(Size), Size.Default);

    const featuresSvg = () => (
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M52.5 18.2354C53.8807 18.2354 55 17.1161 55 15.7354C55 14.3546 53.8807 13.2354 52.5 13.2354C51.1193 13.2354 50 14.3546 50 15.7354C50 17.1161 51.1193 18.2354 52.5 18.2354Z"
          fill="#00ED64"
          stroke="#001E2B"
          strokeMiterlimit="10"
        />
        <path
          d="M53.0208 8.247C56.7576 8.48467 59.7811 11.5065 59.9849 15.2413C60.2567 19.5873 56.8256 23.1863 52.5452 23.1863C52.0016 23.1863 51.4581 23.1184 50.9145 23.0165C50.8126 22.9826 50.6767 23.0165 50.6088 23.1184L25.5039 48.1756C25.402 48.2775 25.368 48.4133 25.436 48.5491C25.9455 49.7035 26.2513 50.9598 26.3532 52.25C26.7948 58.8029 21.6312 64.2353 15.1766 64.2353C13.8177 64.2353 12.5268 63.9977 11.3378 63.5563C10.8622 63.3865 10.7263 62.7754 11.1 62.4358L16.5355 57.1052C17.2489 56.3922 17.2489 55.2039 16.5355 54.4569L13.8857 51.8086C13.1723 51.0956 11.9833 51.0956 11.2359 51.8086L5.80049 57.1731C5.46077 57.5127 4.84929 57.3769 4.67943 56.9015C4.2378 55.6792 4 54.389 4 53.0309C4 46.5798 9.4694 41.419 15.9919 41.8604C17.3847 41.9622 18.7096 42.3018 19.8986 42.879C20.0345 42.9469 20.1704 42.9129 20.2723 42.8111L45.2413 17.9236C45.3092 17.8557 45.3432 17.7199 45.3432 17.5841C45.1734 16.9729 45.1054 16.3617 45.1054 15.7166C45.0714 11.4386 48.6724 8.00933 53.0208 8.247Z"
          stroke="#001E2B"
          strokeMiterlimit="10"
        />
        <path
          d="M27.4833 20.9401L24.9244 23.6817C24.2355 24.4199 23.0873 24.4199 22.3656 23.6817L14.0984 14.789C13.9672 14.6484 13.9672 14.4375 14.0984 14.2969L18.7241 9.3408C18.8553 9.2002 19.0521 9.2002 19.1834 9.3408L27.4833 18.2336C28.1722 18.9717 28.1722 20.202 27.4833 20.9401Z"
          fill="#00ED64"
          stroke="#001E2B"
          strokeMiterlimit="10"
        />
        <path
          d="M54 42.1761C54.7163 41.4597 55.9103 41.4597 56.6607 42.1761L65.7998 51.4263C68.7334 54.3599 68.7334 59.1015 65.7998 62.0351C62.8661 64.9688 58.1246 64.9688 55.191 62.0351L45.9482 52.7924C45.2319 52.076 45.2319 50.8821 45.9482 50.1316"
          fill="#00ED64"
        />
        <path
          d="M45.9482 50.1316C46.6739 49.4053 46.6739 48.2983 45.9482 47.5374C45.2225 46.811 44.013 46.811 43.2528 47.5374C42.4925 48.2638 41.3176 48.2638 40.5573 47.5374C39.7971 46.811 39.8316 45.6004 40.5573 44.8394L48.6091 36.7801C49.3348 36.0538 50.5443 36.0538 51.3045 36.7801C52.0302 37.5065 52.0302 38.7171 51.3045 39.4781C50.5788 40.2045 50.5788 41.4151 51.3045 42.1761C52.0302 42.937 53.2397 42.9024 54 42.1761"
          fill="#00ED64"
        />
        <path
          d="M54 42.1761C54.7163 41.4597 55.9103 41.4597 56.6607 42.1761L65.7998 51.4263C68.7334 54.3599 68.7334 59.1015 65.7998 62.0351C62.8661 64.9688 58.1246 64.9688 55.191 62.0351L45.9482 52.7924C45.2319 52.076 45.2319 50.8821 45.9482 50.1316"
          stroke="#001E2B"
          strokeMiterlimit="10"
        />
        <path
          d="M45.9482 50.1316C46.6739 49.4053 46.6739 48.2983 45.9482 47.5374C45.2225 46.811 44.013 46.811 43.2528 47.5374C42.4925 48.2638 41.3176 48.2638 40.5573 47.5374C39.7971 46.811 39.8316 45.6004 40.5573 44.8394L48.6091 36.7801C49.3348 36.0538 50.5443 36.0538 51.3045 36.7801C52.0302 37.5065 52.0302 38.7171 51.3045 39.4781C50.5788 40.2045 50.5788 41.4151 51.3045 42.1761C52.0302 42.937 53.2397 42.9024 54 42.1761"
          stroke="#001E2B"
          strokeMiterlimit="10"
        />
        <path
          d="M26 22.2354L44.5 40.7354"
          stroke="#001E2B"
          strokeMiterlimit="10"
        />
      </svg>
    );

    const myGlyphs = {
      features: featuresSvg,
    };

    const MyIconComponent = createIconComponent(myGlyphs);

    return (
      <div className={containerStyle}>
        <MyIconComponent glyph="features" fill={fill} size={size} />
        <div className={textStyle}>Features</div>
      </div>
    );
  });
