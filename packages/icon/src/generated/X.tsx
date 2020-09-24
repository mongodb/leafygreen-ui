/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 0143fa0f879c2eddee61666cb2baa186
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface XProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('X');

const X = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: XProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('X', title);
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
        <title id={titleId}>{'Glyphs / X'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <g
        id="Audit"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M9,1.5 L8.999,7 L14.5,7 L14.5,9 L8.999,9 L9,14.5 L7,14.5 L6.999,9 L1.5,9 L1.5,7 L6.999,7 L7,1.5 L9,1.5 Z"
          transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000)"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

X.displayName = 'X';
X.isGlyph = true;
X.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default X;
