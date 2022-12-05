/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 4ed07b15de60dfcd76dd3fb8d6f1b8ca
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';

import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EditProps extends LGGlyph.ComponentProps {}

const Edit = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EditProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Edit', {
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
      <g clipPath="url(#clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.922 1.68126C12.2982 1.30501 12.9082 1.30501 13.2845 1.68126L14.647 3.04377C15.0233 3.42002 15.0233 4.03003 14.647 4.40628L13.2845 5.76879L10.5595 3.04377L9.53759 4.06566L12.2626 6.79068L5.10942 13.9439L1.36251 14.9657L2.3844 11.2188L11.922 1.68126Z"
          fill={'currentColor'}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width={16} height={16} fill={'currentColor'} />
        </clipPath>
      </defs>
    </svg>
  );
};

Edit.displayName = 'Edit';
Edit.isGlyph = true;
Edit.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Edit;
