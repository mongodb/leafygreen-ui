/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 3e8a42b51be3e611809684a3c8e21165
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { getGlyphTitle, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface MenuProps extends LGGlyph.ComponentProps {}

function generateGlyphTitle(): string {
  return `Menu-${Math.floor(Math.random() * 1000000)}`;
}

const Menu = ({
  className,
  size = 16,
  title,
  titleId: customTitleId,
  fill,
  ...props
}: MenuProps) => {
  const titleId = React.useMemo(() => customTitleId || generateGlyphTitle(), [
    customTitleId,
  ]);
  const fillStyle = css`
    color: ${fill};
  `;
  title = getGlyphTitle('Menu', title);
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
        <title id={titleId}>{'Menu'}</title>
      ) : title ? (
        <title id={titleId}>{title}</title>
      ) : null}
      <desc>{'Created with Sketch.'}</desc>
      <g
        id="Menu-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M15,5 L1,5 L1,3 L15,3 L15,5 Z M15,9 L1,9 L1,7 L15,7 L15,9 Z M15,13 L1,13 L1,11 L15,11 L15,13 Z"
          id="\uE202"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Menu.displayName = 'Menu';
Menu.isGlyph = true;
Menu.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Menu;
