/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum c0a0a957835b67fc82ec7a4317528d10
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronDownProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('ChevronDown');

const ChevronDown = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: ChevronDownProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('ChevronDown', title);
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
        <title id={titleId}>{'ChevronDown'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="ChevronDown-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.51396103,1.86396103 L12.513961,1.86396103 L12.513961,3.86396103 L5.51396103,3.86396103 L5.51396103,10.863961 L3.51396103,10.863961 L3.51396103,1.86396103 L5.51396103,1.86396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(8.013961, 6.363961) rotate(225.000000) translate(-8.013961, -6.363961) "
        />
      </g>
    </svg>
  );
};

ChevronDown.displayName = 'ChevronDown';
ChevronDown.isGlyph = true;
ChevronDown.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronDown;
