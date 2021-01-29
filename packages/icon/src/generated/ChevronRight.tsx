/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 9a5b47ab734b47b07d821c1da3cde1e9
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronRightProps extends LGGlyph.ComponentProps {}

const ChevronRight = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronRightProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronRight', {
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
        d="M5.24755 3.24755C4.91199 3.58311 4.9184 4.1291 5.26173 4.4567L8.85059 7.88103L5.32948 11.5713C5.01257 11.9035 5.01872 12.4278 5.34333 12.7524C5.67889 13.088 6.22488 13.0816 6.55247 12.7383L10.5391 8.56005C10.5953 8.50125 10.6412 8.43642 10.6771 8.36774C10.9547 8.03002 10.9299 7.52856 10.6069 7.22037L6.42867 3.2337C6.09653 2.91679 5.57216 2.92294 5.24755 3.24755Z"
        fill={'currentColor'}
      />
    </svg>
  );
};

ChevronRight.displayName = 'ChevronRight';
ChevronRight.isGlyph = true;
ChevronRight.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronRight;
