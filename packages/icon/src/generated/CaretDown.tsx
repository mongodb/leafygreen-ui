/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 9098c2afb03bdbbac156d38ecf6975e9
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CaretDownProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('CaretDown');

const CaretDown = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: CaretDownProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('CaretDown', title);
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
        <title id={titleId}>{'CaretDown'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="CaretDown-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M4.67285687,6 L11.3271431,6 C11.9254697,6 12.224633,6.775217 11.8024493,7.22717749 L8.47530616,10.7889853 C8.21248981,11.0703382 7.78751019,11.0703382 7.52748976,10.7889853 L4.19755071,7.22717749 C3.77536701,6.775217 4.07453029,6 4.67285687,6 Z"
          id="Path"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

CaretDown.displayName = 'CaretDown';
CaretDown.isGlyph = true;
CaretDown.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default CaretDown;
