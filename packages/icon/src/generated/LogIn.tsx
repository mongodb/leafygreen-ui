/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 919850efab3b7d4c45e212846a7e882e
 */
import { css, cx } from '@leafygreen-ui/emotion';
import PropTypes from 'prop-types';
import * as React from 'react';

import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface LogInProps extends LGGlyph.ComponentProps {}
const LogIn = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: LogInProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'LogIn', {
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
        d="M1 3C1 2.44772 1.44772 2 2 2H6.25C6.66421 2 7 2.33579 7 2.75V3.25C7 3.66421 6.66421 4 6.25 4H3V12H6.25C6.66421 12 7 12.3358 7 12.75V13.25C7 13.6642 6.66421 14 6.25 14H2C1.44772 14 1 13.5523 1 13V3Z"
        fill={'currentColor'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.4948 4.11612L6.29289 7.31802C5.90237 7.70854 5.90237 8.34171 6.29289 8.73223L9.49479 11.9341C9.78769 12.227 10.2626 12.227 10.5555 11.9341L10.909 11.5806C11.2019 11.2877 11.2019 10.8128 10.909 10.5199L9.38909 9L14.25 9C14.6642 9 15 8.66421 15 8.25V7.75C15 7.33578 14.6642 7 14.25 7L9.43934 7L10.909 5.53033C11.2019 5.23744 11.2019 4.76256 10.909 4.46967L10.5555 4.11612C10.2626 3.82322 9.78769 3.82322 9.4948 4.11612Z"
        fill={'currentColor'}
      />
    </svg>
  );
};
LogIn.displayName = 'LogIn';
LogIn.isGlyph = true;
LogIn.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default LogIn;
