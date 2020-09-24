/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 3fce7cedc9cc3e6d2cbf40ec8dcbabbc
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UpDownCaretsProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('UpDownCarets');

const UpDownCarets = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: UpDownCaretsProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('UpDownCarets', title);
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
        <title id={titleId}>{'Glyphs / Up Down Carets'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Up-Down-Carets"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M7.5273,1.2109 C7.7873,0.9299 8.2123,0.9299 8.4753,1.2109 L11.8023,4.7729 C12.2243,5.2249 11.9253,5.9999 11.3273,5.9999 L4.6733,5.9999 C4.0743,5.9999 3.7753,5.2249 4.1973,4.7729 L7.5273,1.2109 Z M11.3273,9.9999 C11.9253,9.9999 12.2243,10.7749 11.8023,11.2279 L8.4753,14.7889 C8.2123,15.0699 7.7873,15.0699 7.5273,14.7889 L4.1973,11.2279 C3.7753,10.7749 4.0743,9.9999 4.6733,9.9999 L11.3273,9.9999 Z"
          id="Fill-1"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

UpDownCarets.displayName = 'UpDownCarets';
UpDownCarets.isGlyph = true;
UpDownCarets.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default UpDownCarets;
