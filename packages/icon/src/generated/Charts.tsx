/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum e9e4624f0c0dfc69f48a5f6964a421ee
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChartsProps extends LGGlyph.ComponentProps {}

const Charts = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChartsProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Charts', {
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
        id="Charts-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M2,2 L2,14 L14,14 L14,15 L1,15 L1,2 L2,2 Z M11,3 L11,13 L9,13 L9,3 L11,3 Z M12,5 L14,5 L14,13 L12,13 L12,5 Z M8,6 L8,13 L6,13 L6,6 L8,6 Z M5,8 L5,13 L3,13 L3,8 L5,8 Z"
          id="\uE215"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Charts.displayName = 'Charts';
Charts.isGlyph = true;
Charts.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Charts;
