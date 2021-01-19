/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 415f4133ca1b29e43d1c45f7edc2abad
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CaretRightProps extends LGGlyph.ComponentProps {}

const CaretRight = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CaretRightProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'CaretRight', {
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
        id="CaretRight-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.17285687,6 L11.8271431,6 C12.4254697,6 12.724633,6.775217 12.3024493,7.22717749 L8.97530616,10.7889853 C8.71248981,11.0703382 8.28751019,11.0703382 8.02748976,10.7889853 L4.69755071,7.22717749 C4.27536701,6.775217 4.57453029,6 5.17285687,6 Z"
          id="Path-Copy-2"
          fill={'currentColor'}
          transform="translate(8.500000, 8.500000) rotate(-90.000000) translate(-8.500000, -8.500000) "
        />
      </g>
    </svg>
  );
};

CaretRight.displayName = 'CaretRight';
CaretRight.isGlyph = true;
CaretRight.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default CaretRight;
