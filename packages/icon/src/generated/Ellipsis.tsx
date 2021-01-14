/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum a72f7c5ec7e6ee725501581824ec39f7
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EllipsisProps extends LGGlyph.ComponentProps {}

const Ellipsis = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EllipsisProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Ellipsis', {
    title,
    ariaLabel,
    ariaLabelledby,
  });
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        noFlexShrink,
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      role={role}
      {...accessibleProps}
      {...props}
      viewBox="0 0 16 16"
    >
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
