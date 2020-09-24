/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum f962f6674771efb079211cff170c98a2
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ArrowRightProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('ArrowRight');

const ArrowRight = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: ArrowRightProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('ArrowRight', title);
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
        <title id={titleId}>{'Glyphs / Arrow / Right'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Arrow-/-Right"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M6.95246066,1.93771468 L7.64613325,1.22601328 C7.93985046,0.924662239 8.41479746,0.924662239 8.70539002,1.22601328 L14.7797121,7.45500343 C15.0734293,7.75635447 15.0734293,8.24364553 14.7797121,8.5417907 L8.70539002,14.7739867 C8.4116728,15.0753378 7.93672582,15.0753378 7.64613325,14.7739867 L6.95246066,14.0622853 C6.65561879,13.7577284 6.66186809,13.2608198 6.96495927,12.9626746 L10.730164,9.28234486 L1.7499163,9.28234486 C1.33433768,9.28234486 1,8.93931761 1,8.51293795 L1,7.48706205 C1,7.06068239 1.33433768,6.71765514 1.7499163,6.71765514 L10.730164,6.71765514 L6.96495927,3.0373254 C6.65874345,2.73918021 6.65249414,2.24227158 6.95246066,1.93771468 Z"
          id="Path"
          fill={'currentColor'}
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

ArrowRight.displayName = 'ArrowRight';
ArrowRight.isGlyph = true;
ArrowRight.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ArrowRight;
