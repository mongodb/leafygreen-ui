/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum d2f4d15a8332e31ca2097e5408b3ac0d
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
      <g
        id="ChevronRight-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M3.86396103,3.51396103 L10.863961,3.51396103 L10.863961,5.51396103 L3.86396103,5.51396103 L3.86396103,12.513961 L1.86396103,12.513961 L1.86396103,3.51396103 L3.86396103,3.51396103 Z"
          id="Combined-Shape"
          fill={'currentColor'}
          transform="translate(6.363961, 8.013961) rotate(135.000000) translate(-6.363961, -8.013961) "
        />
      </g>
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
