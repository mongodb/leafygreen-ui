/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 30dc1f6a39c2d65b6fcb241025159b77
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ViewProps extends LGGlyph.ComponentProps {}
const View = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ViewProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'View', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M3 4H4.05V2H2.5C1.67157 2 1 2.67157 1 3.5V4.95H3V4ZM6.45 2H9.55V4H6.45V2ZM11.95 2H13.5C14.3284 2 15 2.67157 15 3.5V4.95H13V4H11.95V2ZM15 6.55V9.45H13V6.55H15ZM3 6.55V9.45H1V6.55H3ZM15 11.05V12.5C15 13.3284 14.3284 14 13.5 14H11.95V12H13V11.05H15ZM3 12V11.05H1V12.5C1 13.3284 1.67157 14 2.5 14H4.05V12H3ZM6.45 12H9.55V14H6.45V12Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M4.5 8C4.5 7.72386 4.72386 7.5 5 7.5H11C11.2761 7.5 11.5 7.72386 11.5 8C11.5 8.27614 11.2761 8.5 11 8.5H5C4.72386 8.5 4.5 8.27614 4.5 8Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M8 5.5C8.27614 5.5 8.5 5.72386 8.5 6L8.5 10C8.5 10.2761 8.27614 10.5 8 10.5C7.72386 10.5 7.5 10.2761 7.5 10L7.5 6C7.5 5.72386 7.72386 5.5 8 5.5Z" fill={'currentColor'} /></svg>;
};
View.displayName = 'View';
View.isGlyph = true;
export default View;