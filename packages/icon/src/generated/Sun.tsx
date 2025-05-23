/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild.ts
* @checksum 665fc345cc27a509ebfd648ea8b9892f
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SunProps extends LGGlyph.ComponentProps {}
const Sun = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SunProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Sun', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M12.24 10.83C11.85 10.44 11.22 10.44 10.83 10.83C10.44 11.22 10.44 11.85 10.83 12.24L11.54 12.95C11.93 13.34 12.56 13.34 12.95 12.95C13.34 12.56 13.34 11.93 12.95 11.54L12.24 10.83Z" fill={'currentColor'} /><path d="M8 12C7.45 12 7 12.45 7 13V14C7 14.55 7.45 15 8 15C8.55 15 9 14.55 9 14V13C9 12.45 8.55 12 8 12Z" fill={'currentColor'} /><path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" fill={'currentColor'} /><path d="M14 7H13C12.45 7 12 7.45 12 8C12 8.55 12.45 9 13 9H14C14.55 9 15 8.55 15 8C15 7.45 14.55 7 14 7Z" fill={'currentColor'} /><path d="M3.76 10.83L3.05 11.54C2.66 11.93 2.66 12.56 3.05 12.95C3.44 13.34 4.07 13.34 4.46 12.95L5.17 12.24C5.56 11.85 5.56 11.22 5.17 10.83C4.78 10.44 4.15 10.44 3.76 10.83Z" fill={'currentColor'} /><path d="M8 4C8.55 4 9 3.55 9 3V2C9 1.45 8.55 1 8 1C7.45 1 7 1.45 7 2V3C7 3.55 7.45 4 8 4Z" fill={'currentColor'} /><path d="M3.76 5.17C4.15 5.56 4.78 5.56 5.17 5.17C5.56 4.78 5.56 4.15 5.17 3.76L4.46 3.05C4.07 2.66 3.44 2.66 3.05 3.05C2.66 3.44 2.66 4.07 3.05 4.46L3.76 5.17Z" fill={'currentColor'} /><path d="M4 8C4 7.45 3.55 7 3 7H2C1.45 7 1 7.45 1 8C1 8.55 1.45 9 2 9H3C3.55 9 4 8.55 4 8Z" fill={'currentColor'} /><path d="M12.24 5.17L12.95 4.46C13.34 4.07 13.34 3.44 12.95 3.05C12.56 2.66 11.93 2.66 11.54 3.05L10.83 3.76C10.44 4.15 10.44 4.78 10.83 5.17C11.22 5.56 11.85 5.56 12.24 5.17Z" fill={'currentColor'} /></svg>;
};
Sun.displayName = 'Sun';
Sun.isGlyph = true;
export default Sun;