/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum 563b7bb14988313ad1e88ec90d90c5d3
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface KeyProps extends LGGlyph.ComponentProps {}
const Key = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: KeyProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Key', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M6.01504 10.0301C6.66679 10.0301 7.28227 9.8748 7.82649 9.5992L9.33772 11.1104L8.41683 12.0313C8.15573 12.2924 8.15573 12.7157 8.41683 12.9768L9.244 13.804C9.5051 14.0651 9.92843 14.0651 10.1895 13.804L11.1104 12.8831L11.8602 13.6329C12.3497 14.1224 13.1433 14.1224 13.6329 13.6329C14.1224 13.1433 14.1224 12.3497 13.6329 11.8602L9.59919 7.82651C9.87479 7.28228 10.0301 6.6668 10.0301 6.01504C10.0301 3.7976 8.23249 2 6.01504 2C3.7976 2 2 3.7976 2 6.01504C2 8.23249 3.7976 10.0301 6.01504 10.0301ZM5.26224 6.51692C5.95519 6.51692 6.51694 5.95517 6.51694 5.26222C6.51694 4.56927 5.95519 4.00752 5.26224 4.00752C4.56929 4.00752 4.00754 4.56927 4.00754 5.26222C4.00754 5.95517 4.56929 6.51692 5.26224 6.51692Z" fill={'currentColor'} /></svg>;
};
Key.displayName = 'Key';
Key.isGlyph = true;
export default Key;