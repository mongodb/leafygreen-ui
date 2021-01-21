/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 4ad455c5f709a1f81613f3b95a6f1d9c
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PersonProps extends LGGlyph.ComponentProps {}

const Person = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PersonProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Person', {
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
        id="Person-Copy"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M11.1171875,9.1328125 C13.671875,9.46875 16,10.59375 16,14.5 L14,14.5 C14,11.5078125 12.5,11 8,11 C3.5,11 2,11.5078125 2,14.5 L0,14.5 C0,10.59375 2.328125,9.46875 4.890625,9.1328125 C4.3359375,8.28125 4,7.1875 4,6 C4,3.2421875 5.7890625,1.5 8,1.5 C10.2109375,1.5 12,3.2421875 12,6 C12,7.1875 11.6640625,8.28125 11.1171875,9.1328125 Z M6,6 C6,7.6015625 6.9375,9 8,9 C9.0625,9 10,7.6015625 10,6 C10,4.484375 9.21875,3.5 8,3.5 C6.7890625,3.5 6,4.484375 6,6 Z"
          id="\uE304"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Person.displayName = 'Person';
Person.isGlyph = true;
Person.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Person;
