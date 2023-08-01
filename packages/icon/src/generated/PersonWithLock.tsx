/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum b32461bf874584d2196a9ba84f97766b
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PersonWithLockProps extends LGGlyph.ComponentProps {}
const PersonWithLock = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PersonWithLockProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'PersonWithLock', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10 4.5C10 5.72482 9.37085 6.8027 8.41809 7.42809C7.86722 7.78968 7.20817 8 6.5 8C5.83553 8 5.21431 7.81484 4.68512 7.49329C4.65031 7.47214 4.6159 7.4504 4.58191 7.42809C3.62915 6.8027 3 5.72482 3 4.5C3 2.567 4.567 1 6.5 1C8.433 1 10 2.567 10 4.5Z" fill={'currentColor'} /><path d="M4.34253 8.45005C3.92858 8.22348 3.39921 8.20507 3.091 8.56241C2.41111 9.3507 2 10.3773 2 11.5V14H8V11.5C8 11.0546 8.19412 10.6546 8.50236 10.3798C8.53463 9.56068 8.89535 8.82593 9.45648 8.30362C9.19722 8.2528 8.90646 8.31377 8.65747 8.45005C8.01691 8.80067 7.28173 9 6.5 9C5.71827 9 4.98309 8.80067 4.34253 8.45005Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M9.5 10.5V11C9.22386 11 9 11.2239 9 11.5V14.5C9 14.7761 9.22386 15 9.5 15H13.5C13.7761 15 14 14.7761 14 14.5V11.5C14 11.2239 13.7761 11 13.5 11V10.5C13.5 9.39543 12.6046 8.5 11.5 8.5C10.3954 8.5 9.5 9.39543 9.5 10.5ZM11.5 9.5C10.9477 9.5 10.5 9.94771 10.5 10.5V11H12.5V10.5C12.5 9.94771 12.0523 9.5 11.5 9.5Z" fill={'currentColor'} /></svg>;
};
PersonWithLock.displayName = 'PersonWithLock';
PersonWithLock.isGlyph = true;
PersonWithLock.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default PersonWithLock;