/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum ccf43569045543e2180806af5b05954a
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronUpProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('ChevronUp');

const ChevronUp = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: ChevronUpProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('ChevronUp', title);
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
        <title id={titleId}>{'ChevronUp'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="ChevronUp-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.51396103,5.36396103 L12.513961,5.36396103 L12.513961,7.36396103 L5.51396103,7.36396103 L5.51396103,14.363961 L3.51396103,14.363961 L3.51396103,5.36396103 L5.51396103,5.36396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(8.013961, 9.863961) rotate(45.000000) translate(-8.013961, -9.863961) "
        />
      </g>
    </svg>
  );
};

ChevronUp.displayName = 'ChevronUp';
ChevronUp.isGlyph = true;
ChevronUp.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronUp;
