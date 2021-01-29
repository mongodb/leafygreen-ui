/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum c8bb2c8e40025d50cc61d86e5cd2d7b1
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DatabaseProps extends LGGlyph.ComponentProps {}

const Database = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DatabaseProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Database', {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7101 2.59521C13.9375 2.83299 14 3.17099 14 3.5V4.58225C11.8386 5.51665 9.24264 5.79669 6.90516 5.65374C5.62252 5.5753 4.44257 5.37081 3.48512 5.09194C2.86226 4.91051 2.36497 4.70663 2 4.50455V3.5C2 3.17099 2.06253 2.83299 2.28993 2.59521C3.18267 1.66172 5.45211 1 8 1C10.5479 1 12.8173 1.66172 13.7101 2.59521ZM2 6.16279V9.06565C2.36497 9.26773 2.86226 9.47161 3.48512 9.65304C4.44257 9.93191 5.62252 10.1364 6.90516 10.2148C9.24264 10.3578 11.8386 10.0778 14 9.14335V6.19859C11.6953 7.05948 9.09974 7.29075 6.81359 7.15095C5.43477 7.06662 4.14337 6.84599 3.06566 6.53209C2.69138 6.42307 2.33289 6.29997 2 6.16279ZM14 10.7597C11.6953 11.6206 9.09974 11.8519 6.81359 11.712C5.43477 11.6277 4.14337 11.4071 3.06566 11.0932C2.69138 10.9842 2.33289 10.8611 2 10.7239V12.5C2 12.829 2.06253 13.167 2.28993 13.4048C3.18267 14.3383 5.45211 15 8 15C10.5479 15 12.8173 14.3383 13.7101 13.4048C13.9375 13.167 14 12.829 14 12.5V10.7597Z"
        fill="#000000"
      />
    </svg>
  );
};

Database.displayName = 'Database';
Database.isGlyph = true;
Database.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Database;
