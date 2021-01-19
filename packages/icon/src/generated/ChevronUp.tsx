/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum e87b308c0916e5233264686523882d04
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
      <g
        id="ChevronUp-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.51396103,5.36396103 L12.513961,5.36396103 L12.513961,7.36396103 L5.51396103,7.36396103 L5.51396103,14.363961 L3.51396103,14.363961 L3.51396103,5.36396103 L5.51396103,5.36396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(8.013961, 9.863961) rotate(45.000000) translate(-8.013961, -9.863961) "
        />
      </g>
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
