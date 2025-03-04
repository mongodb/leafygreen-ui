/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum 26e6263fa109b4ef79396b07e2d905a2
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface Diagram2Props extends LGGlyph.ComponentProps {}
const Diagram2 = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: Diagram2Props) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Diagram2', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10.72 1C10.3224 1 10 1.33579 10 1.75V2H7.48C7.2149 2 7 2.22386 7 2.5V7H5V6.75C5 6.33579 4.67765 6 4.28 6H1.72C1.32235 6 1 6.33579 1 6.75V8.25C1 8.66421 1.32235 9 1.72 9H4.28C4.67765 9 5 8.66421 5 8.25V8H7V12.5C7 12.7761 7.2149 13 7.48 13H10V13.25C10 13.6642 10.3224 14 10.72 14H12.78C13.1776 14 13.5 13.6642 13.5 13.25V11.75C13.5 11.3358 13.1776 11 12.78 11H10.72C10.3224 11 10 11.3358 10 11.75V12H8V8H10V8.25C10 8.66421 10.3224 9 10.72 9H12.78C13.1776 9 13.5 8.66421 13.5 8.25V6.75C13.5 6.33579 13.1776 6 12.78 6H10.72C10.3224 6 10 6.33579 10 6.75V7H8V3H10V3.25C10 3.66421 10.3224 4 10.72 4H12.78C13.1776 4 13.5 3.66421 13.5 3.25V1.75C13.5 1.33579 13.1776 1 12.78 1L10.72 1Z" fill={'currentColor'} /></svg>;
};
Diagram2.displayName = 'Diagram2';
Diagram2.isGlyph = true;
export default Diagram2;