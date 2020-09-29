/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum ca3302f69455c6f8d9dd408f8979a019
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LockProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Lock');

const Lock = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: LockProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Lock', title);
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
        <title id={titleId}>{'Lock'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Lock-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M12,7 L14,7 L14,9 L4,9 L4,13 L12,13 L12,12 L14,12 L14,15 L2,15 L2,7 L4,7 L4,5 C4,2.796875 5.796875,1 8,1 C10.203125,1 12,2.796875 12,5 L12,7 Z M10,7 L10,5 C10,3.8984375 9.1015625,3 8,3 C6.8984375,3 6,3.8984375 6,5 L6,7 L10,7 Z M12,11 L12,10 L14,10 L14,11 L12,11 Z"
          id="\uE205"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Lock.displayName = 'Lock';
Lock.isGlyph = true;
Lock.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Lock;
