/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum cb11c1ee9247427201d0320c30e83648
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface NotAllowedProps extends LGGlyph.ComponentProps {}

const NotAllowed = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: NotAllowedProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'NotAllowed', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
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
        id="Glyphs-/-Not-Allowed"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M6.07397536,12.0681603 C6.65784897,12.3450781 7.31083251,12.5 8,12.5 C10.4852814,12.5 12.5,10.4852814 12.5,8 C12.5,7.31083251 12.3450781,6.65784897 12.0681603,6.07397536 L6.07397536,12.0681603 Z M3.94531399,9.95418095 L9.95418095,3.94531399 C9.36317452,3.65995219 8.70026668,3.5 8,3.5 C5.51471863,3.5 3.5,5.51471863 3.5,8 C3.5,8.70026668 3.65995219,9.36317452 3.94531399,9.95418095 Z M8,15.5 C3.85786438,15.5 0.5,12.1421356 0.5,8 C0.5,3.85786438 3.85786438,0.5 8,0.5 C12.1421356,0.5 15.5,3.85786438 15.5,8 C15.5,12.1421356 12.1421356,15.5 8,15.5 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

NotAllowed.displayName = 'NotAllowed';
NotAllowed.isGlyph = true;
NotAllowed.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default NotAllowed;
