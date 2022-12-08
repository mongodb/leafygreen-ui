/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum e223eacd3a3cd576a2c70f8bce5d9c80
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DragProps extends LGGlyph.ComponentProps {}

const Drag = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DragProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Drag', {
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
        d="M4 4C4 4.55228 3.55228 5 3 5C2.44772 5 2 4.55228 2 4C2 3.44772 2.44772 3 3 3C3.55228 3 4 3.44772 4 4Z"
        fill={'currentColor'}
      />
      <path
        d="M8 4C8 4.55228 7.5523 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.5523 3 8 3.44772 8 4Z"
        fill={'currentColor'}
      />
      <path
        d="M4 8C4 8.55228 3.55228 9 3 9C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7C3.55228 7 4 7.44772 4 8Z"
        fill={'currentColor'}
      />
      <path
        d="M4 12C4 12.5523 3.55228 13 3 13C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12Z"
        fill={'currentColor'}
      />
      <path
        d="M8 8C8 8.55228 7.5523 9 7 9C6.44772 9 6 8.55228 6 8C6 7.44772 6.44772 7 7 7C7.5523 7 8 7.44772 8 8Z"
        fill={'currentColor'}
      />
      <path
        d="M8 12C8 12.5523 7.5523 13 7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11C7.5523 11 8 11.4477 8 12Z"
        fill={'currentColor'}
      />
    </svg>
  );
};

Drag.displayName = 'Drag';
Drag.isGlyph = true;
Drag.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Drag;
