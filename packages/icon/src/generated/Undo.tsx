/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum 02908964952538687d0fec2e71465069
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UndoProps extends LGGlyph.ComponentProps {}
const Undo = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: UndoProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Undo', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M11.9812 9.40216C12.0303 9.72987 12.2942 10 12.6256 10H13.4256C13.757 10 14.0288 9.73064 13.9961 9.40089C13.8186 7.6104 12.8539 6.05139 11.4531 5.07473C10.9741 4.73549 10.4315 4.46519 9.844 4.28051C9.27044 4.09832 8.6595 4.00002 8.0256 4.00002C8.01612 3.99998 8.00663 4.00002 7.99714 4.00002C5.29819 4.00002 3.04689 5.71778 2.52999 8.00002H1.11567C0.574518 8.00002 0.323974 8.67204 0.733046 9.02631L3.21469 11.1755C3.43432 11.3657 3.76031 11.3657 3.97994 11.1755L6.46159 9.02631C6.87066 8.67204 6.62011 8.00002 6.07896 8.00002H4.63233C5.10106 6.91458 6.31283 6.00002 7.99714 6.00002C8.18375 6.00002 8.36456 6.01124 8.5392 6.03269C9.24477 6.12312 9.89283 6.39739 10.4338 6.80592C10.4522 6.8206 10.4704 6.83543 10.4885 6.85041C10.5052 6.86432 10.5225 6.87728 10.5404 6.88926C11.2999 7.50399 11.8297 8.39119 11.9812 9.40216Z" fill={'currentColor'} /></svg>;
};
Undo.displayName = 'Undo';
Undo.isGlyph = true;
export default Undo;