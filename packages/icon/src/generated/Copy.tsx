/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum ae0e365328301a38b0beaaa8e34820dc
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CopyProps extends LGGlyph.ComponentProps {}

const Copy = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CopyProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Copy', {
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
        id="Copy-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M13,5 L10,5 L10,2 L7,2 L7,11 L13,11 L13,5 Z M15,5 L15,13 L5,13 L5,0 L10,0 L15,5 Z"
          fill={'currentColor'}
        />
        <path
          d="M4,4 L4,5 L2,5 L2,15 L9,15 L9,14 L10,14 L10,16 L1,16 L1,4 L4,4 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Copy.displayName = 'Copy';
Copy.isGlyph = true;
Copy.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Copy;
