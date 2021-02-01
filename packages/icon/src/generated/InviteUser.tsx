/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 186ebc4d05dd6665de5de0bf6f1f2d19
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface InviteUserProps extends LGGlyph.ComponentProps {}

const InviteUser = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: InviteUserProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'InviteUser', {
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
        d="M4.34253 8.45005C3.92858 8.22348 3.39921 8.20507 3.091 8.56241C2.41111 9.35069 2 10.3773 2 11.5V15H8.96819C8.24461 14.6259 7.75 13.8707 7.75 13C7.75 11.8376 8.63145 10.8811 9.7624 10.7624C9.82023 10.2113 10.077 9.71949 10.4596 9.36C10.3047 9.07406 10.1198 8.80678 9.909 8.56241C9.60079 8.20507 9.07142 8.22348 8.65747 8.45005C8.01691 8.80066 7.28173 8.99999 6.5 8.99999C5.71827 8.99999 4.98309 8.80066 4.34253 8.45005ZM9 13C9 12.4477 9.44772 12 10 12H11V11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V12H14C14.5523 12 15 12.4477 15 13C15 13.5523 14.5523 14 14 14H13V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V14H10C9.44772 14 9 13.5523 9 13ZM9.85 4.49999C9.85 6.35015 8.35015 7.84999 6.5 7.84999C4.64985 7.84999 3.15 6.35015 3.15 4.49999C3.15 2.64984 4.64985 1.14999 6.5 1.14999C8.35015 1.14999 9.85 2.64984 9.85 4.49999Z"
        fill={'currentColor'}
      />
    </svg>
  );
};

InviteUser.displayName = 'InviteUser';
InviteUser.isGlyph = true;
InviteUser.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default InviteUser;
