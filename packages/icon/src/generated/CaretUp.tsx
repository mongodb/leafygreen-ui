/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 0865790592ce088f9c4facff86a17036
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CaretUpProps extends LGGlyph.ComponentProps {}

const CaretUp = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CaretUpProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'CaretUp', {
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
        id="CaretUp-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M4.67285687,5 L11.3271431,5 C11.9254697,5 12.224633,5.775217 11.8024493,6.22717749 L8.47530616,9.78898533 C8.21248981,10.0703382 7.78751019,10.0703382 7.52748976,9.78898533 L4.19755071,6.22717749 C3.77536701,5.775217 4.07453029,5 4.67285687,5 Z"
          id="Path-Copy"
          fill={'currentColor'}
          transform="translate(8.000000, 7.500000) rotate(180.000000) translate(-8.000000, -7.500000) "
        />
      </g>
    </svg>
  );
};

CaretUp.displayName = 'CaretUp';
CaretUp.isGlyph = true;
CaretUp.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default CaretUp;
