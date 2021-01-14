/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 24de2b3917189a54a7876434cb378ead
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface TrashProps extends LGGlyph.ComponentProps {}

const Trash = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: TrashProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Trash', {
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
        id="Trash-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <rect
          id="Rectangle"
          fill={'currentColor'}
          x={5}
          y={0}
          width={6}
          height={1}
        />
        <rect
          id="Rectangle"
          fill={'currentColor'}
          x={5}
          y={1}
          width={1}
          height={1}
        />
        <rect
          id="Rectangle-Copy-3"
          fill={'currentColor'}
          x={10}
          y={1}
          width={1}
          height={1}
        />
        <rect
          id="Rectangle"
          fill={'currentColor'}
          x={1}
          y={2}
          width={14}
          height={2}
        />
        <path
          d="M2,5 L14,5 L14,14 C14,15.1045695 13.1045695,16 12,16 L4,16 C2.8954305,16 2,15.1045695 2,14 L2,5 Z M4,6 L4,14 L5,14 L5,6 L4,6 Z M7.5,6 L7.5,14 L8.5,14 L8.5,6 L7.5,6 Z M11,6 L11,14 L12,14 L12,6 L11,6 Z"
          id="Combined-Shape"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Trash.displayName = 'Trash';
Trash.isGlyph = true;
Trash.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Trash;
