/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 1cb2485b10576295ea5d4b1b1b30e06b
*/
import * as React from "react";
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
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.41809 7.42809C9.37085 6.8027 10 5.72482 10 4.5C10 2.567 8.433 1 6.5 1C4.567 1 3 2.567 3 4.5C3 5.76853 3.67485 6.87944 4.68512 7.49329C5.21431 7.81484 5.83553 8 6.5 8C7.20817 8 7.86722 7.78968 8.41809 7.42809Z" fill={'currentColor'} /><path d="M3.091 8.56241C3.39921 8.20507 3.92858 8.22348 4.34253 8.45005C4.98309 8.80067 5.71827 9 6.5 9C7.28173 9 8.01691 8.80067 8.65747 8.45005C9.07142 8.22348 9.60079 8.20507 9.909 8.56241C10.0194 8.6904 10.1227 8.82467 10.2183 8.96461C9.77928 9.33148 9.5 9.88313 9.5 10.5C8.39543 10.5 7.5 11.3954 7.5 12.5C7.5 13.0973 7.76188 13.6335 8.17709 14H2V11.5C2 10.3773 2.41111 9.3507 3.091 8.56241Z" fill={'currentColor'} /><path d="M10.5 10.5C10.5 10.272 10.5763 10.0618 10.7048 9.89357C10.8875 9.65434 11.1757 9.5 11.5 9.5C12.0523 9.5 12.5 9.94772 12.5 10.5V11.5H13.5C14.0523 11.5 14.5 11.9477 14.5 12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H12.5V14.5C12.5 15.0523 12.0523 15.5 11.5 15.5C10.9477 15.5 10.5 15.0523 10.5 14.5V13.5H9.5C8.94772 13.5 8.5 13.0523 8.5 12.5C8.5 11.9477 8.94772 11.5 9.5 11.5H10.5V10.5Z" fill={'currentColor'} /></svg>;
};
InviteUser.displayName = 'InviteUser';
InviteUser.isGlyph = true;
InviteUser.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default InviteUser;