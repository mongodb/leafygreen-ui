/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum f2f15bff1aea280a162f525afd49f617
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SaveProps extends LGGlyph.ComponentProps {}

const Save = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SaveProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Save', {
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
        id="Save-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M12,2 L15,6 L15,15 L1,15 L1,2 L12,2 Z M13,13 L13,6.6640625 L11,4 L9,4 L9,7 L4,7 L4,4 L3,4 L3,13 L4,13 L4,10 L9,10 L9,13 L13,13 Z M7,4 L7,6 L8,6 L8,4 L7,4 Z M8,12 L8,11 L5,11 L5,12 L8,12 Z M8,14 L8,13 L5,13 L5,14 L8,14 Z"
          id="\uE208"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Save.displayName = 'Save';
Save.isGlyph = true;
Save.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Save;
