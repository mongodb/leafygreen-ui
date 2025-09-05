/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum c49bb6f86ac38132c73ffe2cd13d6343
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CloneProps extends LGGlyph.ComponentProps {}
const Clone = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CloneProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Clone', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M5.5 12C5.5 13.1046 6.39543 14 7.5 14H12.5C13.6046 14 14.5 13.1046 14.5 12V8C14.5 6.89543 13.6046 6 12.5 6H7.5C6.39543 6 5.5 6.89543 5.5 8V12Z" fill={'currentColor'} /><path d="M4.25 10H3.5C2.39543 10 1.5 9.10457 1.5 8V4C1.5 2.89543 2.39543 2 3.5 2H8.5C9.60457 2 10.5 2.89543 10.5 4V4.75H8.5V4H3.5L3.5 8H4.25V10Z" fill={'currentColor'} /></svg>;
};
Clone.displayName = 'Clone';
Clone.isGlyph = true;
export default Clone;