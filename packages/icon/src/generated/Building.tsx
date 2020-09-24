/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 4627166693ff85acabc061c9ae77720e
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface BuildingProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Building');

const Building = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: BuildingProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Building', title);
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
        <title id={titleId}>{'Building'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Building-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M10,4 L14,4 L14,15 L1,15 L1,1 L10,1 L10,4 Z M3,3 L3,13 L8,13 L8,3 L3,3 Z M4,6 L4,4 L5,4 L5,6 L4,6 Z M6,6 L6,4 L7,4 L7,6 L6,6 Z M9,6 L9,13 L12,13 L12,6 L9,6 Z M4,9 L4,7 L5,7 L5,9 L4,9 Z M6,9 L6,7 L7,7 L7,9 L6,9 Z M10,9 L10,7 L11,7 L11,9 L10,9 Z M4,12 L4,10 L5,10 L5,12 L4,12 Z M6,12 L6,10 L7,10 L7,12 L6,12 Z M10,12 L10,10 L11,10 L11,12 L10,12 Z"
          id="\uE207"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Building.displayName = 'Building';
Building.isGlyph = true;
Building.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Building;
