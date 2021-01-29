/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum ac6d73f558d5d7d7fde22b679c5454f8
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronUpProps extends LGGlyph.ComponentProps {}

const ChevronUp = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronUpProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronUp', {
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
        d="M3.24755 10.6211C3.58311 10.9566 4.1291 10.9502 4.4567 10.6069L7.88103 7.01803L11.5713 10.5391C11.9035 10.8561 12.4278 10.8499 12.7524 10.5253C13.088 10.1897 13.0816 9.64375 12.7383 9.31615L8.56005 5.32948C8.50124 5.27337 8.43642 5.22739 8.36774 5.19151C8.03002 4.91394 7.52856 4.93875 7.22037 5.26174L3.2337 9.43996C2.91679 9.77209 2.92294 10.2965 3.24755 10.6211Z"
        fill={'currentColor'}
      />
    </svg>
  );
};

ChevronUp.displayName = 'ChevronUp';
ChevronUp.isGlyph = true;
ChevronUp.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronUp;
