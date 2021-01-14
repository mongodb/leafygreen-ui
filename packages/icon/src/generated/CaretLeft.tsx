/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum b88f7790c0de6327cb87427e8902bfc4
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CaretLeftProps extends LGGlyph.ComponentProps {}

const CaretLeft = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CaretLeftProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'CaretLeft', {
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
        id="CaretLeft-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M4.17285687,6 L10.8271431,6 C11.4254697,6 11.724633,6.775217 11.3024493,7.22717749 L7.97530616,10.7889853 C7.71248981,11.0703382 7.28751019,11.0703382 7.02748976,10.7889853 L3.69755071,7.22717749 C3.27536701,6.775217 3.57453029,6 4.17285687,6 Z"
          id="Path-Copy-2"
          fill={'currentColor'}
          transform="translate(7.500000, 8.500000) rotate(90.000000) translate(-7.500000, -8.500000) "
        />
      </g>
    </svg>
  );
};

CaretLeft.displayName = 'CaretLeft';
CaretLeft.isGlyph = true;
CaretLeft.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default CaretLeft;
