/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum c06efb2d8c638a80409ca4df3835484f
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CheckmarkWithCircleProps extends LGGlyph.ComponentProps {}

const CheckmarkWithCircle = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CheckmarkWithCircleProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'CheckmarkWithCircle', {
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
        id="Glyphs-/-Checkmark-With-Circle"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M8,15.5 C3.85786438,15.5 0.5,12.1421356 0.5,8 C0.5,3.85786438 3.85786438,0.5 8,0.5 C12.1421356,0.5 15.5,3.85786438 15.5,8 C15.5,12.1421356 12.1421356,15.5 8,15.5 Z M6.94974747,9.94974747 L4.12132034,7.12132034 L2.70710678,8.53553391 L6.94974747,12.7781746 L8.36396103,11.363961 L13.3137085,6.41421356 L11.8994949,5 L6.94974747,9.94974747 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

CheckmarkWithCircle.displayName = 'CheckmarkWithCircle';
CheckmarkWithCircle.isGlyph = true;
CheckmarkWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default CheckmarkWithCircle;
