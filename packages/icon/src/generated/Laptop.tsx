/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum d6853c1dcdd6d11f93fd452997459af8
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LaptopProps extends LGGlyph.ComponentProps {}

const Laptop = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: LaptopProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Laptop', {
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
        id="Laptop-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M14,4 L14,11 L2,11 L2,4 C2,2.8984375 2.8984375,2 4,2 L12,2 C13.1015625,2 14,2.8984375 14,4 Z M12,9 L12,4 L4,4 L4,9 L12,9 Z M0,12 L16,12 L16,13 C16,13.5546875 15.5546875,14 15,14 L1,14 C0.4453125,14 0,13.5546875 0,13 L0,12 Z"
          id="\uE206"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Laptop.displayName = 'Laptop';
Laptop.isGlyph = true;
Laptop.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Laptop;
