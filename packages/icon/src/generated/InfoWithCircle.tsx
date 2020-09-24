/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum cd571f5ec466f73abb63684a8c96ab64
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface InfoWithCircleProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('InfoWithCircle');

const InfoWithCircle = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: InfoWithCircleProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('InfoWithCircle', title);
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      {...props}
      viewBox="0 0 16 16"
      role="img"
      aria-labelledby={titleId}
    >
      {title === undefined ? (
        <title id={titleId}>{'Glyphs / Info With Circle'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Info-With-Circle"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M8,15.5 C3.85786438,15.5 0.5,12.1421356 0.5,8 C0.5,3.85786438 3.85786438,0.5 8,0.5 C12.1421356,0.5 15.5,3.85786438 15.5,8 C15.5,12.1421356 12.1421356,15.5 8,15.5 Z M9,9 L9,7 L6,7 L6,9 L7,9 L7,11 L6,11 L6,13 L10,13 L10,11 L9,11 L9,9 Z M8,6 C8.82842712,6 9.5,5.32842712 9.5,4.5 C9.5,3.67157288 8.82842712,3 8,3 C7.17157288,3 6.5,3.67157288 6.5,4.5 C6.5,5.32842712 7.17157288,6 8,6 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

InfoWithCircle.displayName = 'InfoWithCircle';
InfoWithCircle.isGlyph = true;
InfoWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default InfoWithCircle;
