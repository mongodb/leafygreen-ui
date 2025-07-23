import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { BlobSVG } from '../BlobSVG/BlobSVG';
import { GraphicStyle } from '../MarketingModal/MarketingModal.types';

import {
  baseStyle,
  containerBaseStyle,
  containerStyleStyles,
  curvedSVGBaseStyles,
  curvedSVGThemeStyles,
  filledStyle,
} from './Graphic.styles';
import { GraphicProps } from './Graphic.types';

/**
 *
 * @internal
 */
export const Graphic = ({
  graphic,
  graphicStyle,
  blobPosition,
  showBlob,
  theme,
}: GraphicProps) => {
  const filledGraphic = graphicStyle === GraphicStyle.Fill;

  return (
    <>
      {showBlob && graphicStyle === GraphicStyle.Center && (
        <BlobSVG blobPosition={blobPosition} theme={theme} />
      )}
      <div
        className={cx(containerBaseStyle, containerStyleStyles[graphicStyle])}
      >
        {React.cloneElement(graphic, {
          className: `${graphic.props.className ?? ''} ${cx(baseStyle, {
            [filledStyle]: filledGraphic,
          })}`,
        })}
        {filledGraphic && (
          <svg
            className={cx(curvedSVGBaseStyles, curvedSVGThemeStyles[theme])}
            viewBox="0 0 600 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M329.065 48C439.779 45.2633 537.038 27.0233 600 3.86855e-06V49H0V0C62.9624 27.0233 160.221 45.2633 270.935 48H329.065Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    </>
  );
};
