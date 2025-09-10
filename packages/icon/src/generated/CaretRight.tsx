/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 47bdb54fcab8aca96858ae2be419aa77
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CaretRightProps extends LGGlyph.ComponentProps {}
const CaretRight = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CaretRightProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'CaretRight', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10.7962 7.32097C11.0679 7.54729 11.0679 7.95271 10.7962 8.17903L6.97649 11.3604C6.59428 11.6787 6 11.4176 6 10.9313L6 4.56866C6 4.0824 6.59428 3.82129 6.97649 4.13962L10.7962 7.32097Z" fill={'currentColor'} /></svg>;
};
CaretRight.displayName = 'CaretRight';
CaretRight.isGlyph = true;
export default CaretRight;