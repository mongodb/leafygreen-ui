/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum c32f410913f9bef4f3e84ccfe43a2b0f
*/
import * as React from "react";
import { useId } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, getGlyphLabel, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PauseProps extends LGGlyph.ComponentProps {}
const Pause = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PauseProps) => {
  const titleId = useId();
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const safeTitle = title || getGlyphLabel('Pause');
  const accessibleProps = generateAccessibleProps(role, 'Pause', {
    title,
    titleId,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><title id={titleId}>{safeTitle}</title><path d="M3.5 3.83333C3.5 3.3731 3.94771 3 4.5 3H5.5C6.05228 3 6.5 3.3731 6.5 3.83333V12.1667C6.5 12.6269 6.05228 13 5.5 13H4.5C3.94771 13 3.5 12.6269 3.5 12.1667V3.83333Z" fill={'currentColor'} /><path d="M9.5 3.83333C9.5 3.3731 9.94772 3 10.5 3H11.5C12.0523 3 12.5 3.3731 12.5 3.83333V12.1667C12.5 12.6269 12.0523 13 11.5 13H10.5C9.94771 13 9.5 12.6269 9.5 12.1667V3.83333Z" fill={'currentColor'} /></svg>;
};
Pause.displayName = 'Pause';
Pause.isGlyph = true;
export default Pause;