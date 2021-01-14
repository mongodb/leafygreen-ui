/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum e8f5a75e5c05271e08adc8b03916d77d
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CaretDownProps extends LGGlyph.ComponentProps {}

const CaretDown = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CaretDownProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'CaretDown', {
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
        id="CaretDown-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M4.67285687,6 L11.3271431,6 C11.9254697,6 12.224633,6.775217 11.8024493,7.22717749 L8.47530616,10.7889853 C8.21248981,11.0703382 7.78751019,11.0703382 7.52748976,10.7889853 L4.19755071,7.22717749 C3.77536701,6.775217 4.07453029,6 4.67285687,6 Z"
          id="Path"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

CaretDown.displayName = 'CaretDown';
CaretDown.isGlyph = true;
CaretDown.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default CaretDown;
