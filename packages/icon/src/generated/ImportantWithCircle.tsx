/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 3ecd349cd015bc9bf8627a711c20cad1
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ImportantWithCircleProps extends LGGlyph.ComponentProps {}

const ImportantWithCircle = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ImportantWithCircleProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'ImportantWithCircle', {
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
        id="Glyphs-/-Important-With-Circle"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M9,8.75 L7,8.75 L6.75,3.75 L9.25,3.75 L9,8.75 Z M8,12.25 C7.31,12.25 6.75,11.69 6.75,11 C6.75,10.31 7.31,9.75 8,9.75 C8.69,9.75 9.25,10.31 9.25,11 C9.25,11.69 8.69,12.25 8,12.25 L8,12.25 Z M8,0.5 C3.857,0.5 0.5,3.857 0.5,8 C0.5,12.142 3.857,15.5 8,15.5 C12.142,15.5 15.5,12.142 15.5,8 C15.5,3.857 12.142,0.5 8,0.5 L8,0.5 Z"
          id="Shape"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

ImportantWithCircle.displayName = 'ImportantWithCircle';
ImportantWithCircle.isGlyph = true;
ImportantWithCircle.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default ImportantWithCircle;
