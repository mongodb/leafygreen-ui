/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum eeea36a12d7e0c78bf3aad12c14a8a5d
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PlayProps extends LGGlyph.ComponentProps {}
const Play = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PlayProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Play', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M13.7789 6.70433C14.7711 7.28315 14.7711 8.71685 13.7789 9.29567L6.25581 13.6841C5.25582 14.2674 4 13.5461 4 12.3884L4 3.61155C4 2.45387 5.25582 1.73256 6.25581 2.31589L13.7789 6.70433Z" fill={'currentColor'} /></svg>;
};
Play.displayName = 'Play';
Play.isGlyph = true;
export default Play;