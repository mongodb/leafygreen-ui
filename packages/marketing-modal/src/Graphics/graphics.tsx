import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import {
  baseGraphicContainerStyle,
  centeredGraphicContainerStyle,
  filledGraphicContainerStyle,
  baseGraphicStyle,
  filledGraphicStyle,
  curvedSVGBaseStyles,
  curvedSVGThemeStyles,
} from './styles';
import { GraphicStyle } from '../MarketingModal/types';
import { GraphicProps } from './types';
import BlobSVG from '../BlobSVG/BlobSVG';

/**
 *
 * @internal
 */
const Graphics = ({
  graphic,
  darkMode,
  graphicStyle,
  blobPosition,
  showBlob,
}: GraphicProps) => {
  return (
    <>
      {showBlob && graphicStyle === GraphicStyle.Center && (
        <BlobSVG darkMode={darkMode} blobPosition={blobPosition} />
      )}
      <div
        className={cx(baseGraphicContainerStyle, {
          [centeredGraphicContainerStyle]: graphicStyle === GraphicStyle.Center,
          [filledGraphicContainerStyle]: graphicStyle === GraphicStyle.Fill,
        })}
      >
        {React.cloneElement(graphic, {
          className: `${graphic.props.className ?? ''} ${cx(baseGraphicStyle, {
            [filledGraphicStyle]: graphicStyle === GraphicStyle.Fill,
          })}`,
        })}
        {graphicStyle === GraphicStyle.Fill && (
          <svg
            className={cx(curvedSVGBaseStyles, curvedSVGThemeStyles(darkMode))}
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

export default Graphics;
