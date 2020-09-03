/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 57fd346c8329400c1987fd17473b2db2
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronRightProps extends LGGlyph.ComponentProps {}

function generateGlyphTitle(): string {
  return `ChevronRight-${Math.floor(Math.random() * 1000000)}`;
}

const ChevronRight = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: ChevronRightProps) => {
  const titleId = React.useMemo(() => customTitleId || generateGlyphTitle(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('ChevronRight', title);
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
        <title id={titleId}>{'ChevronRight'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="ChevronRight-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M3.86396103,3.51396103 L10.863961,3.51396103 L10.863961,5.51396103 L3.86396103,5.51396103 L3.86396103,12.513961 L1.86396103,12.513961 L1.86396103,3.51396103 L3.86396103,3.51396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(6.363961, 8.013961) rotate(135.000000) translate(-6.363961, -8.013961) "
        />
      </g>
    </svg>
  );
};

ChevronRight.displayName = 'ChevronRight';
ChevronRight.isGlyph = true;
ChevronRight.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronRight;
