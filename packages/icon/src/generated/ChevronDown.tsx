/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 642273bae4476bc1a764abc368806776
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ChevronDownProps extends LGGlyph.ComponentProps {}

const ChevronDown = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ChevronDownProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'ChevronDown', {
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
        id="ChevronDown-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.51396103,1.86396103 L12.513961,1.86396103 L12.513961,3.86396103 L5.51396103,3.86396103 L5.51396103,10.863961 L3.51396103,10.863961 L3.51396103,1.86396103 L5.51396103,1.86396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(8.013961, 6.363961) rotate(225.000000) translate(-8.013961, -6.363961) "
        />
      </g>
    </svg>
  );
};

ChevronDown.displayName = 'ChevronDown';
ChevronDown.isGlyph = true;
ChevronDown.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ChevronDown;
