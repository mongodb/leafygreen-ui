/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 2101479291b7b79ff9859658f63d0bf5
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface VerticalEllipsisProps extends LGGlyph.ComponentProps {}
const idAllocator = IdAllocator.create('VerticalEllipsis');

const VerticalEllipsis = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: VerticalEllipsisProps) => {
  const titleId = React.useMemo(() => customTitleId || idAllocator.generate(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('VerticalEllipsis', title);
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
        <title id={titleId}>{'Glyphs / Vertical Ellipsis'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Glyphs-/-Vertical-Ellipsis"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M8,12.5 L8.14439324,12.5068608 C8.90473356,12.5794844 9.5,13.2197059 9.5,13.999 L9.5,13.999 L9.49312925,14.1435595 C9.42040138,14.9047336 8.77929412,15.5 8,15.5 L8,15.5 L7.85560676,15.493129 C7.09526644,15.4203979 6.5,14.7792353 6.5,13.999 C6.5,13.171 7.172,12.5 8,12.5 L8,12.5 Z M8,6.501 L8.14439324,6.50786078 C8.90473356,6.58048443 9.5,7.22070588 9.5,8 L9.5,8 L9.49312925,8.14438327 C9.42040138,8.90461938 8.77929412,9.499 8,9.499 L8,9.499 L7.85560676,9.49213922 C7.09526644,9.41951557 6.5,8.77929412 6.5,8 C6.5,7.172 7.172,6.501 8,6.501 L8,6.501 Z M8,0.5 L8.14439324,0.506870955 C8.90473356,0.579602076 9.5,1.22076471 9.5,2.001 L9.5,2.001 L9.49312925,2.14538327 C9.42040138,2.90561938 8.77929412,3.5 8,3.5 L8,3.5 L7.85560676,3.49313922 C7.09526644,3.42051557 6.5,2.78029412 6.5,2.001 C6.5,1.172 7.172,0.5 8,0.5 L8,0.5 Z"
          id="Combined-Shape"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

VerticalEllipsis.displayName = 'VerticalEllipsis';
VerticalEllipsis.isGlyph = true;
VerticalEllipsis.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default VerticalEllipsis;
