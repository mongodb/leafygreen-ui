/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 0eccf39f0042cb0494f06fa90ad6efb6
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface NotAllowedProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('NotAllowed');

const NotAllowed = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: NotAllowedProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('NotAllowed', title);
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
        <title id={titleId}>{'Glyphs / Not Allowed'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Not-Allowed"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M6.07397536,12.0681603 C6.65784897,12.3450781 7.31083251,12.5 8,12.5 C10.4852814,12.5 12.5,10.4852814 12.5,8 C12.5,7.31083251 12.3450781,6.65784897 12.0681603,6.07397536 L6.07397536,12.0681603 Z M3.94531399,9.95418095 L9.95418095,3.94531399 C9.36317452,3.65995219 8.70026668,3.5 8,3.5 C5.51471863,3.5 3.5,5.51471863 3.5,8 C3.5,8.70026668 3.65995219,9.36317452 3.94531399,9.95418095 Z M8,15.5 C3.85786438,15.5 0.5,12.1421356 0.5,8 C0.5,3.85786438 3.85786438,0.5 8,0.5 C12.1421356,0.5 15.5,3.85786438 15.5,8 C15.5,12.1421356 12.1421356,15.5 8,15.5 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

NotAllowed.displayName = 'NotAllowed';
NotAllowed.isGlyph = true;
NotAllowed.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default NotAllowed;
