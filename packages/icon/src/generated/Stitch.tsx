/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum b19c1b780302330a872c55a4664e8c48
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface StitchProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Stitch');

const Stitch = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: StitchProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Stitch', title);
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
        <title id={titleId}>{'Stitch'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Stitch-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M0,0 L16,0 L16,16 L0,16 L0,0 Z M14,4 L14,2 L2,2 L2,4 L14,4 Z M14,14 L14,5 L2,5 L2,14 L14,14 Z M8,6 L8,13 L6,13 L6,6 L8,6 Z M13,6 L13,10 L9,10 L9,6 L13,6 Z M5,8 L5,13 L3,13 L3,8 L5,8 Z M13,11 L13,13 L9,13 L9,11 L13,11 Z"
          id="\uE311"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Stitch.displayName = 'Stitch';
Stitch.isGlyph = true;
Stitch.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Stitch;
