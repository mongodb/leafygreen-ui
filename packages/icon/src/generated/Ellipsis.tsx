/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum c1ebeb174b71cbfaa7c40b8655c2a992
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EllipsisProps extends LGGlyph.ComponentProps {}

function generateGlyphTitle(): string {
  return `Ellipsis-${Math.floor(Math.random() * 1000000)}`;
}

const Ellipsis = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: EllipsisProps) => {
  const titleId = React.useMemo(() => customTitleId || generateGlyphTitle(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Ellipsis', title);
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
        <title id={titleId}>{'Ellipsis'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Ellipsis-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M2,6.5 C2.828125,6.5 3.5,7.171875 3.5,8 C3.5,8.828125 2.828125,9.5 2,9.5 C1.171875,9.5 0.5,8.828125 0.5,8 C0.5,7.171875 1.171875,6.5 2,6.5 Z M8,6.5 C8.828125,6.5 9.5,7.171875 9.5,8 C9.5,8.828125 8.828125,9.5 8,9.5 C7.171875,9.5 6.5,8.828125 6.5,8 C6.5,7.171875 7.171875,6.5 8,6.5 Z M14,6.5 C14.828125,6.5 15.5,7.171875 15.5,8 C15.5,8.828125 14.828125,9.5 14,9.5 C13.171875,9.5 12.5,8.828125 12.5,8 C12.5,7.171875 13.171875,6.5 14,6.5 Z"
          id="\uE224"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Ellipsis.displayName = 'Ellipsis';
Ellipsis.isGlyph = true;
Ellipsis.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Ellipsis;
