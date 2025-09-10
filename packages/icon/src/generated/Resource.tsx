/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 9ec4992f3837f7bd0837fb90a4d9ed89
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ResourceProps extends LGGlyph.ComponentProps {}
const Resource = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ResourceProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Resource', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M6.09999 1.99998C5.71339 1.99998 5.39999 2.31338 5.39999 2.69998V13.3C5.39999 13.6866 5.71339 14 6.09999 14H8.19999C8.58659 14 8.89999 13.6866 8.89999 13.3V2.69998C8.89999 2.31338 8.58659 1.99998 8.19999 1.99998H6.09999ZM8.02499 2.99998H6.27499V3.99998H8.02499V2.99998ZM6.27499 4.99998H8.02499V5.49998H6.27499V4.99998ZM8.02499 12H6.27499V13H8.02499V12Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M9.84432 2.35808C9.46647 2.4399 9.22758 2.81229 9.31074 3.18984L11.5698 13.4468C11.653 13.8243 12.0267 14.0641 12.4046 13.9823L14.4557 13.5381C14.8335 13.4563 15.0724 13.0839 14.9893 12.7064L12.7302 2.44944C12.647 2.07189 12.2733 1.83215 11.8954 1.91396L9.84432 2.35808ZM11.9381 2.91964L10.2283 3.28984L10.4417 4.25852L12.1514 3.88832L11.9381 2.91964ZM10.6551 5.22735L12.3648 4.85715L12.4715 5.34149L10.7618 5.71169L10.6551 5.22735ZM13.8583 11.6377L12.1485 12.0079L12.3619 12.9766L14.0716 12.6064L13.8583 11.6377Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M2.09999 1.99998C1.71339 1.99998 1.39999 2.31338 1.39999 2.69998V13.3C1.39999 13.6866 1.71339 14 2.09999 14H4.19999C4.58659 14 4.89999 13.6866 4.89999 13.3V2.69998C4.89999 2.31338 4.58659 1.99998 4.19999 1.99998H2.09999ZM4.02499 2.99998H2.27499V3.99998H4.02499V2.99998ZM2.27499 4.99998H4.02499V5.49998H2.27499V4.99998ZM4.02499 12H2.27499V13H4.02499V12Z" fill={'currentColor'} /></svg>;
};
Resource.displayName = 'Resource';
Resource.isGlyph = true;
export default Resource;