/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 9a149b60d56b38244e2de31405f99d6f
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SortDescendingProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('SortDescending');

const SortDescending = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: SortDescendingProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('SortDescending', title);
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
        <title id={titleId}>{'Glyphs / Sorting / Sort Descending'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Sorting-/-Sort-Descending"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M4.1745,2 C4.5335,2 4.8245,2.291 4.8245,2.65 L4.8245,2.65 L4.8245,11.708 L6.0375,10.495 C6.2915,10.241 6.7035,10.242 6.9575,10.495 C7.2115,10.749 7.2105,11.161 6.9575,11.414 L6.9575,11.414 L4.6585,13.713 C4.4045,13.967 3.9925,13.967 3.7385,13.713 L3.7385,13.713 L1.4405,11.414 C1.1865,11.161 1.1865,10.749 1.4405,10.495 C1.6945,10.241 2.1065,10.241 2.3605,10.495 L2.3605,10.495 L3.5235,11.659 L3.5235,2.65 C3.5235,2.291 3.8145,2 4.1745,2 Z M14.1332,12.2126 C14.4922,12.2126 14.7832,12.5036 14.7832,12.8626 C14.7832,13.2216 14.4922,13.5126 14.1332,13.5126 L8.4552,13.5126 C8.0962,13.5126 7.8052,13.2216 7.8052,12.8626 C7.8052,12.5036 8.0962,12.2126 8.4552,12.2126 L14.1332,12.2126 Z M13.265,8.8908 C13.624,8.8908 13.915,9.1818 13.915,9.5408 C13.915,9.8998 13.624,10.1908 13.265,10.1908 L8.455,10.1908 C8.096,10.1908 7.805,9.8998 7.805,9.5408 C7.805,9.1818 8.096,8.8908 8.455,8.8908 L13.265,8.8908 Z M12.139,5.5685 C12.498,5.5685 12.789,5.8595 12.789,6.2185 C12.789,6.5775 12.498,6.8685 12.139,6.8685 L8.455,6.8685 C8.096,6.8685 7.805,6.5775 7.805,6.2185 C7.805,5.8595 8.096,5.5685 8.455,5.5685 L12.139,5.5685 Z M11.0365,2.2467 C11.3955,2.2467 11.6865,2.5377 11.6865,2.8967 C11.6865,3.2557 11.3955,3.5467 11.0365,3.5467 L8.4555,3.5467 C8.0965,3.5467 7.8055,3.2557 7.8055,2.8967 C7.8055,2.5377 8.0965,2.2467 8.4555,2.2467 L11.0365,2.2467 Z"
          id="Combined-Shape"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

SortDescending.displayName = 'SortDescending';
SortDescending.isGlyph = true;
SortDescending.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default SortDescending;
