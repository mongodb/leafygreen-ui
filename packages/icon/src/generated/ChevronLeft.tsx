/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum a6615583880c1a8c300f0319b3643aa0
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronLeftProps extends LGGlyph.ComponentProps {}

const ChevronLeft = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronLeftProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronLeft', {
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
        id="ChevronLeft-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M7.16396103,3.51396103 L14.163961,3.51396103 L14.163961,5.51396103 L7.16396103,5.51396103 L7.16396103,12.513961 L5.16396103,12.513961 L5.16396103,3.51396103 L7.16396103,3.51396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(9.663961, 8.013961) rotate(-45.000000) translate(-9.663961, -8.013961) "
        />
      </g>
    </svg>
  );
};

ChevronLeft.displayName = 'ChevronLeft';
ChevronLeft.isGlyph = true;
ChevronLeft.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronLeft;
