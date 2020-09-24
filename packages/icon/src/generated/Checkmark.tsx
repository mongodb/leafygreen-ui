/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 0df7db00771c4a323345befb442e725b
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CheckmarkProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('Checkmark');

const Checkmark = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: CheckmarkProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Checkmark', title);
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
        <title id={titleId}>{'Glyphs / Checkmark'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Checkmark"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M6.94974747,10.363961 L13.3137085,4 L14.7279221,5.41421356 L8.36396103,11.7781746 L6.94974747,13.1923882 L2,8.24264069 L3.41421356,6.82842712 L6.94974747,10.363961 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Checkmark.displayName = 'Checkmark';
Checkmark.isGlyph = true;
Checkmark.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Checkmark;
