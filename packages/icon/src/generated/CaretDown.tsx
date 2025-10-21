/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum bb758a7b36134da40b89b5108df19cb3
*/
import * as React from "react";
import { useId } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, getGlyphLabel, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CaretDownProps extends LGGlyph.ComponentProps {}
const CaretDown = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CaretDownProps) => {
  const titleId = useId();
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const safeTitle = title || getGlyphLabel('CaretDown');
  const accessibleProps = generateAccessibleProps(role, 'CaretDown', {
    title,
    titleId,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><title id={titleId}>{safeTitle}</title><path d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z" fill={'currentColor'} /></svg>;
};
CaretDown.displayName = 'CaretDown';
CaretDown.isGlyph = true;
export default CaretDown;