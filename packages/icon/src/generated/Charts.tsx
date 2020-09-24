/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 6d2eea5dc97665ec6240e72055ed9c3f
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChartsProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Charts');

const Charts = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: ChartsProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Charts', title);
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
        <title id={titleId}>{'Charts'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Charts-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M2,2 L2,14 L14,14 L14,15 L1,15 L1,2 L2,2 Z M11,3 L11,13 L9,13 L9,3 L11,3 Z M12,5 L14,5 L14,13 L12,13 L12,5 Z M8,6 L8,13 L6,13 L6,6 L8,6 Z M5,8 L5,13 L3,13 L3,8 L5,8 Z"
          id="\uE215"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Charts.displayName = 'Charts';
Charts.isGlyph = true;
Charts.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Charts;
