/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 47eadc9e15b3236772e7857968e6ce8a
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SMSProps extends LGGlyph.ComponentProps {}
const SMS = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SMSProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'SMS', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M1 4C1 2.89543 1.89543 2 3 2H13C14.1046 2 15 2.89543 15 4V10C15 11.1046 14.1046 12 13 12H7.75495L4.23014 14.8311C3.74164 15.2234 3 14.8886 3 14.2758L3 12C1.89543 12 1 11.1046 1 10V4ZM3.00001 4.75C3.00001 4.33579 3.3358 4 3.75001 4H11.25C11.6642 4 12 4.33579 12 4.75C12 5.16421 11.6642 5.5 11.25 5.5H3.75001C3.3358 5.5 3.00001 5.16421 3.00001 4.75ZM3.00001 7.75C3.00001 7.33579 3.3358 7 3.75001 7H9.25001C9.66423 7 10 7.33579 10 7.75C10 8.16421 9.66423 8.5 9.25001 8.5H3.75001C3.3358 8.5 3.00001 8.16421 3.00001 7.75Z" fill={'currentColor'} /></svg>;
};
SMS.displayName = 'SMS';
SMS.isGlyph = true;
SMS.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default SMS;